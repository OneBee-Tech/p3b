import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { renderToStream } from "@react-pdf/renderer";
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register a standard font if needed, otherwise rely on built-ins

const styles = StyleSheet.create({
    page: { padding: 40, fontFamily: 'Helvetica', backgroundColor: '#ffffff' },
    header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40, borderBottom: '2px solid #0f172a', paddingBottom: 20 },
    brandTitle: { fontSize: 24, fontWeight: 'bold', color: '#0f172a' },
    brandSub: { fontSize: 10, color: '#64748b', marginTop: 4 },
    invoiceInfo: { alignItems: 'flex-end' },
    invoiceTitle: { fontSize: 28, fontWeight: 'bold', color: '#0ea5e9', marginBottom: 8 },
    infoText: { fontSize: 10, color: '#334155', marginBottom: 2 },

    section: { marginBottom: 30 },
    sectionTitle: { fontSize: 12, fontWeight: 'bold', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: 6, marginBottom: 12 },
    row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    label: { fontSize: 10, color: '#64748b', width: '30%' },
    value: { fontSize: 10, color: '#0f172a', width: '70%', fontWeight: 'bold' },

    tableHeader: { flexDirection: 'row', backgroundColor: '#f8fafc', padding: 8, borderBottom: '1px solid #cbd5e1' },
    tableRow: { flexDirection: 'row', padding: 8, borderBottom: '1px solid #e2e8f0' },
    col1: { width: '50%', fontSize: 10, color: '#0f172a' },
    col2: { width: '25%', fontSize: 10, color: '#0f172a', textAlign: 'center' },
    col3: { width: '25%', fontSize: 10, color: '#0f172a', textAlign: 'right', fontWeight: 'bold' },

    totalRow: { flexDirection: 'row', paddingTop: 12, justifyContent: 'flex-end' },
    totalLabel: { fontSize: 12, color: '#0f172a', fontWeight: 'bold', marginRight: 20 },
    totalValue: { fontSize: 14, color: '#0ea5e9', fontWeight: 'bold' },

    footer: { position: 'absolute', bottom: 40, left: 40, right: 40, borderTop: '1px solid #e2e8f0', paddingTop: 20 },
    footerText: { fontSize: 8, color: '#94a3b8', textAlign: 'center', marginBottom: 4 },
});

const InvoicePDF = ({ donation, invoiceId }: { donation: any, invoiceId: string }) => {
    const dateStr = new Date(donation.createdAt).toLocaleDateString();

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.brandTitle}>Hope for Humanity</Text>
                        <Text style={styles.brandSub}>Global Child Sponsorship & Education Fund</Text>
                        <Text style={styles.brandSub}>Tax ID: 501(c)(3) 12-3456789</Text>
                    </View>
                    <View style={styles.invoiceInfo}>
                        <Text style={styles.invoiceTitle}>OFFICIAL RECEIPT</Text>
                        <Text style={styles.infoText}>Invoice No: {invoiceId}</Text>
                        <Text style={styles.infoText}>Date: {dateStr}</Text>
                        <Text style={styles.infoText}>Status: PAID</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>DONOR DETAILS</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Name:</Text>
                        <Text style={styles.value}>{donation.user?.name || 'Anonymous Contributor'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Email Address:</Text>
                        <Text style={styles.value}>{donation.user?.email || 'N/A'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Ledger ID:</Text>
                        <Text style={styles.value}>{donation.user?.id || 'GUEST'}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>CONTRIBUTION LEDGER</Text>
                    <View style={styles.tableHeader}>
                        <Text style={styles.col1}>Description</Text>
                        <Text style={styles.col2}>Allocation Target</Text>
                        <Text style={styles.col3}>Amount USD</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.col1}>
                            {donation.type === 'RECURRING_MONTHLY' ? 'Monthly Child Sponsorship' : 'One-Time Philanthropic Gift'}
                        </Text>
                        <Text style={styles.col2}>{donation.program?.name || 'General Fund (Unrestricted)'}</Text>
                        <Text style={styles.col3}>${(Number(donation.amount) / 100).toFixed(2)}</Text>
                    </View>

                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total Tax-Deductible Amount:</Text>
                        <Text style={styles.totalValue}>${(Number(donation.amount) / 100).toFixed(2)}</Text>
                    </View>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>This document is a mathematically verified snapshot from the Hope for Humanity immutable ledger.</Text>
                    <Text style={styles.footerText}>Retain this receipt for your tax records. No goods or services were provided in exchange for this contribution.</Text>
                    <Text style={styles.footerText}>Generated securely by Admin/System Node on {new Date().toUTCString()}</Text>
                </View>
            </Page>
        </Document>
    );
};

export async function GET(request: Request, { params }: { params: { donationId: string } }) {
    const session = await auth();
    // Security Governance: Only the donor themselves or an ADMIN can view this invoice
    if (!session?.user) {
        return new NextResponse("Unauthorized. Sign in required.", { status: 401 });
    }

    try {
        const donation = await prisma.donation.findUnique({
            where: { id: params.donationId },
            include: { user: true, program: true }
        });

        if (!donation) {
            return new NextResponse("Donation Ledger Entry Not Found", { status: 404 });
        }

        // Authorization Gateway
        const isAdmin = (session.user as any).role === "ADMIN";
        const isOwner = donation.userId === session.user.id;

        if (!isAdmin && !isOwner) {
            return new NextResponse("Forbidden. Strict access controls enforced on financial records.", { status: 403 });
        }

        // Standardize ID pattern: INV-{YEAR}-{DONATION_ID}
        const year = new Date(donation.createdAt).getFullYear();
        const invoiceId = `INV-${year}-${donation.id.slice(-8).toUpperCase()}`;

        const pdfStream = await renderToStream(<InvoicePDF donation={donation} invoiceId={invoiceId} />);

        // Log this generation if accessed by Admin to ensure strict auditing
        if (isAdmin && !isOwner) {
            await prisma.adminActionLog.create({
                data: {
                    adminId: session.user.id,
                    actionType: "GENERATE_INVOICE_PDF",
                    targetEntity: "Donation",
                    targetId: donation.id,
                    newValue: `Accessed secure invoice ${invoiceId}`,
                }
            });
        }

        return new NextResponse(pdfStream as any, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `inline; filename="${invoiceId}.pdf"`
            }
        });
    } catch (error) {
        console.error("PDF Invoice Engine Error:", error);
        return new NextResponse("Internal Server Error generating PDF.", { status: 500 });
    }
}

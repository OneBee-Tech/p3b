import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register standard fonts
Font.register({
    family: 'Open Sans',
    fonts: [
        { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
        { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf', fontWeight: 700 }
    ]
});

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#F9F6F0', // warm-ivory
        padding: 40,
        fontFamily: 'Open Sans'
    },
    borderWrap: {
        border: '8 solid #204066', // trust-blue
        height: '100%',
        padding: 40,
        position: 'relative',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    brand: {
        position: 'absolute',
        top: 30,
        left: 30,
        color: '#10b981',
        fontSize: 14,
        fontWeight: 700,
    },
    title: {
        marginTop: 60,
        fontSize: 42,
        color: '#204066',
        fontWeight: 700,
        marginBottom: 20
    },
    subtitle: {
        fontSize: 20,
        color: '#6b7280',
        marginBottom: 30
    },
    donorName: {
        fontSize: 48,
        color: '#10b981', // emerald
        fontWeight: 700,
        borderBottom: '2 solid #e5e7eb',
        paddingBottom: 15,
        marginBottom: 30
    },
    paragraph: {
        fontSize: 18,
        color: '#374151',
        lineHeight: 1.6,
        textAlign: 'center',
        paddingHorizontal: 40,
    },
    bold: {
        fontWeight: 700,
    },
    footerLeft: {
        position: 'absolute',
        bottom: 40,
        left: 40,
    },
    signatureLine: {
        borderBottom: '1 solid #9ca3af',
        width: 150,
        marginBottom: 10
    },
    footerTitle: {
        fontWeight: 700,
        color: '#204066',
        fontSize: 14,
    },
    footerSubtitle: {
        fontSize: 12,
        color: '#6b7280'
    },
    footerRight: {
        position: 'absolute',
        bottom: 40,
        right: 40,
        textAlign: 'right'
    },
    year: {
        fontWeight: 700,
        color: '#d9a944',
        fontSize: 20
    }
});

interface ImpactCertificateProps {
    donorName: string;
    totalDonated: number;
    communitiesSupported: number;
}

export const ImpactCertificate = ({ donorName, totalDonated, communitiesSupported }: ImpactCertificateProps) => (
    <Document>
        <Page size="A4" orientation="landscape" style={styles.page}>
            <View style={styles.borderWrap}>
                <Text style={styles.brand}>ONEBEE TECH INC.</Text>

                <Text style={styles.title}>Certificate of Impact</Text>
                <Text style={styles.subtitle}>This certifies that</Text>

                <Text style={styles.donorName}>{donorName}</Text>

                <Text style={styles.paragraph}>
                    Has made a profound difference in the lives of children around the world.
                </Text>
                <Text style={styles.paragraph}>
                    Through your generous support, you have directly funded education, supplies, and community
                    infrastructure across <Text style={styles.bold}>{communitiesSupported}</Text> communities, contributing
                    a total normalized value of <Text style={styles.bold}>${totalDonated.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</Text>.
                </Text>

                <View style={styles.footerLeft}>
                    <View style={styles.signatureLine} />
                    <Text style={styles.footerTitle}>CEO, OneBee Tech</Text>
                    <Text style={styles.footerSubtitle}>Global Education Initiative</Text>
                </View>

                <View style={styles.footerRight}>
                    <Text style={styles.year}>{new Date().getFullYear()}</Text>
                    <Text style={styles.footerSubtitle}>Verified official record.</Text>
                </View>
            </View>
        </Page>
    </Document>
);

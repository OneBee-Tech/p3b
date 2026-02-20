'use client';

import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { FileText, Loader2 } from 'lucide-react';

interface CertificateProps {
    donorName: string;
    totalDonated: number;
    communitiesSupported: number;
}

export function DownloadCertificateButton({ donorName, totalDonated, communitiesSupported }: CertificateProps) {
    const [isGenerating, setIsGenerating] = useState(false);
    const certificateRef = useRef<HTMLDivElement>(null);

    const generatePDF = async () => {
        setIsGenerating(true);
        try {
            if (!certificateRef.current) return;

            // Un-hide the certificate container just for rendering
            certificateRef.current.style.display = 'block';

            const canvas = await html2canvas(certificateRef.current, {
                scale: 2, // higher resolution
                useCORS: true,
                logging: false
            });

            // Re-hide it
            certificateRef.current.style.display = 'none';

            const imgData = canvas.toDataURL('image/png');

            // A4 size: 210 x 297 mm
            // Landscape mode
            const pdf = new jsPDF('l', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Impact_Certificate_${new Date().getFullYear()}.pdf`);

        } catch (error) {
            console.error('Failed to generate PDF:', error);
            alert("There was an error generating your certificate. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <>
            <Button
                variant="outline"
                size="sm"
                className="bg-white border-impact-gold text-impact-gold hover:bg-impact-gold hover:text-white transition-colors"
                onClick={generatePDF}
                disabled={isGenerating || totalDonated === 0}
            >
                {isGenerating ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...</>
                ) : (
                    <><FileText className="w-4 h-4 mr-2" /> Generate Certificate (PDF)</>
                )}
            </Button>

            {/* Hidden Certificate HTML Template */}
            <div
                ref={certificateRef}
                style={{
                    display: 'none',
                    width: '1122px', // A4 landscape width at 96dpi
                    height: '793px', // A4 landscape height
                    background: '#F9F6F0', // warm-ivory
                    padding: '60px',
                    position: 'absolute',
                    top: '-9999px',
                    left: '-9999px',
                    fontFamily: 'sans-serif'
                }}
            >
                <div style={{
                    border: '8px solid #204066', // trust-blue
                    height: '100%',
                    padding: '40px',
                    textAlign: 'center',
                    position: 'relative',
                    background: '#FFFFFF'
                }}>
                    <div style={{ position: 'absolute', top: '40px', left: '40px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
                        ONEBEE TECH INC.
                    </div>

                    <h1 style={{ marginTop: '80px', fontSize: '48px', color: '#204066', marginBottom: '20px' }}>Certificate of Impact</h1>
                    <p style={{ fontSize: '24px', color: '#6b7280', marginBottom: '40px' }}>This certifies that</p>

                    <h2 style={{ fontSize: '56px', color: '#10b981', margin: '0 0 40px 0', borderBottom: '2px solid #e5e7eb', paddingBottom: '20px', display: 'inline-block' }}>
                        {donorName || 'Generous Donor'}
                    </h2>

                    <p style={{ fontSize: '20px', color: '#374151', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto' }}>
                        Has made a profound difference in the lives of children around the world.
                        Through your generous support, you have directly funded education, supplies, and community
                        infrastructure across <strong>{communitiesSupported}</strong> communities, contributing a total normalized value of <strong>${totalDonated.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</strong>.
                    </p>

                    <div style={{ position: 'absolute', bottom: '60px', left: '60px', textAlign: 'left' }}>
                        <div style={{ borderBottom: '1px solid #9ca3af', width: '200px', marginBottom: '10px' }}></div>
                        <p style={{ margin: 0, fontWeight: 'bold', color: '#204066' }}>CEO, OneBee Tech</p>
                        <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>Global Education Initiative</p>
                    </div>

                    <div style={{ position: 'absolute', bottom: '60px', right: '60px', textAlign: 'right' }}>
                        <p style={{ margin: 0, fontWeight: 'bold', color: '#d9a944', fontSize: '24px' }}>{new Date().getFullYear()}</p>
                        <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>Verified official record.</p>
                    </div>
                </div>
            </div>
        </>
    );
}

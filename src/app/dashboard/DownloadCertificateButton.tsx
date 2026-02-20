'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { FileText, Loader2 } from 'lucide-react';

interface CertificateProps {
    donorName: string;
    totalDonated: number;
    communitiesSupported: number;
}

export function DownloadCertificateButton({ donorName, totalDonated, communitiesSupported }: CertificateProps) {
    const [isGenerating, setIsGenerating] = useState(false);

    const generatePDF = async () => {
        setIsGenerating(true);
        try {
            const response = await fetch('/api/certificates', {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error("Failed to fetch certificate");
            }

            // Convert Response Stream to Blob
            const blob = await response.blob();

            // Create a temporary anchor element to trigger the download
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Impact_Certificate_${new Date().getFullYear()}.pdf`;
            document.body.appendChild(a);
            a.click();

            // Cleanup
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

        } catch (error) {
            console.error('Failed to generate PDF:', error);
            alert("There was an error generating your secure certificate. Please try again later.");
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
        </>
    );
}

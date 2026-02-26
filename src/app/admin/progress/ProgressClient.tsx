"use client";

import { useState } from "react";
import { Plus, Download, ShieldCheck, Clock, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { createProgressReport, verifyProgressReport } from "./actions";

type ProgressReport = any; // Assuming imported prisma type

export default function ProgressClient({ reports, childrenList, currentAdminId }: { reports: ProgressReport[], childrenList: any[], currentAdminId: string }) {
    const [isCreating, setIsCreating] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        formData.append("adminId", currentAdminId);

        try {
            await createProgressReport(formData);
            setIsCreating(false);
            e.currentTarget.reset();
        } catch (error) {
            console.error(error);
            alert("Failed to submit report.");
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleVerify(reportId: string, status: "VERIFIED" | "FLAGGED") {
        try {
            await verifyProgressReport(reportId, currentAdminId, status);
        } catch (error) {
            alert("Verification update failed.");
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-cinematic-dark">Child Progress Reporting</h1>
                    <p className="text-gray-500 mt-1">Upload and verify educational and wellbeing updates.</p>
                </div>
                <button
                    onClick={() => setIsCreating(!isCreating)}
                    className="flex items-center gap-2 bg-trust-blue text-white px-4 py-2 rounded-lg hover:bg-trust-blue/90 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    {isCreating ? "Cancel" : "New Report"}
                </button>
            </div>

            {isCreating && (
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-bold mb-4">Draft New Progress Report</h2>
                    <form onSubmit={handleCreate} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Select Child</label>
                                <select name="registryChildId" required className="w-full border rounded-lg p-2 bg-gray-50">
                                    <option value="">-- Choose --</option>
                                    {childrenList.map(c => (
                                        <option key={c.id} value={c.id}>{c.displayName} ({c.region})</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Reporting Period</label>
                                <input type="text" name="reportingPeriod" placeholder="e.g. Term 1, 2026" required className="w-full border rounded-lg p-2 bg-gray-50" />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Academic Performance Summary</label>
                                <textarea name="academicPerformance" required rows={3} className="w-full border rounded-lg p-2 bg-gray-50" placeholder="Summary of grades and educational progress..." />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Attendance Rate (%)</label>
                                <input type="number" name="attendanceRate" min="0" max="100" step="0.1" className="w-full border rounded-lg p-2 bg-gray-50" />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Teacher Feedback (Sensitive)</label>
                                <textarea name="teacherFeedback" rows={2} className="w-full border rounded-lg p-2 bg-gray-50 bg-yellow-50/50" placeholder="Direct quotes or behavioral notes from instructors..." />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Wellbeing Notes (Sensitive)</label>
                                <textarea name="wellbeingNotes" rows={2} className="w-full border rounded-lg p-2 bg-gray-50 bg-yellow-50/50" placeholder="Health, emotional, or social observation notes..." />
                            </div>
                        </div>

                        <hr className="my-6 border-gray-200" />
                        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-trust-blue" />
                            Safeguarding & Governance
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-50/30 p-4 rounded-lg border border-blue-100">
                            <div className="flex items-start gap-2 col-span-2">
                                <input type="checkbox" name="guardianConsentConfirmed" id="guardianConsentConfirmed" className="mt-1" required />
                                <label htmlFor="guardianConsentConfirmed" className="text-sm text-gray-700">
                                    <strong>Guardian Consent Confirmed.</strong> I verify that the child’s legal guardian has consented to this progress report being shared with the sponsor.
                                </label>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Consent Document URL (Optional)</label>
                                <input type="url" name="consentDocumentUrl" placeholder="https://secure-storage/consent.pdf" className="w-full border rounded-lg p-2 bg-white" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Report PDF URL (Cloudinary/S3)</label>
                                <input type="url" name="reportDocumentUrl" placeholder="https://secure-storage/report.pdf" className="w-full border rounded-lg p-2 bg-white" />
                                <span className="text-xs text-gray-400 mt-1 block">Max 5MB. Do not upload direct identifying letterheads.</span>
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Scheduled Publishing (Optional)</label>
                                <input type="datetime-local" name="publishAt" className="w-full border rounded-lg p-2 bg-white max-w-sm" />
                                <span className="text-xs text-gray-400 mt-1 block">Report will be withheld from sponsors until this date.</span>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button disabled={isSubmitting} type="submit" className="bg-cinematic-dark text-white px-6 py-2 rounded-lg font-bold hover:bg-black transition-colors disabled:opacity-50">
                                {isSubmitting ? "Saving..." : "Submit Draft for Verification"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500 font-medium">
                        <tr>
                            <th className="p-4">Child (ID)</th>
                            <th className="p-4">Period</th>
                            <th className="p-4">Risk Score</th>
                            <th className="p-4">Governance</th>
                            <th className="p-4">Publish Date</th>
                            <th className="p-4 text-right">Verification Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {reports.map((report) => (
                            <tr key={report.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="p-4 font-medium text-cinematic-dark">
                                    {report.registryChild.displayName}
                                    <span className="block text-xs text-gray-400 font-normal">Attendance: {report.attendanceRate || "N/A"}%</span>
                                </td>
                                <td className="p-4 text-gray-600">{report.reportingPeriod}</td>
                                <td className="p-4">
                                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${report.riskScore === 'STABLE' ? 'bg-green-100 text-green-700' :
                                            report.riskScore === 'MONITOR' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-red-100 text-red-700'
                                        }`}>
                                        {report.riskScore}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex flex-col gap-1 text-xs">
                                        <span className="flex items-center gap-1 text-gray-500">
                                            {report.guardianConsentConfirmed ? <CheckCircle className="w-3 h-3 text-green-500" /> : <XCircle className="w-3 h-3 text-red-500" />} Consent
                                        </span>
                                        <span className={`flex items-center gap-1 font-bold ${report.verificationStatus === "VERIFIED" ? "text-green-600" :
                                                report.verificationStatus === "FLAGGED" ? "text-red-600" :
                                                    "text-yellow-600"
                                            }`}>
                                            Status: {report.verificationStatus}
                                        </span>
                                    </div>
                                </td>
                                <td className="p-4 text-gray-500 text-xs text-center">
                                    {report.publishAt ? new Date(report.publishAt).toLocaleDateString() : "Immediate"}
                                </td>
                                <td className="p-4 text-right">
                                    {report.verificationStatus === "PENDING" && (
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => handleVerify(report.id, "VERIFIED")} className="px-3 py-1 bg-green-50 text-green-600 hover:bg-green-100 rounded text-xs font-bold border border-green-200">Approve</button>
                                            <button onClick={() => handleVerify(report.id, "FLAGGED")} className="px-3 py-1 bg-red-50 text-red-600 hover:bg-red-100 rounded text-xs font-bold border border-red-200">Flag</button>
                                        </div>
                                    )}
                                    {report.reportDocumentUrl && (
                                        <a href={report.reportDocumentUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs text-trust-blue hover:underline">
                                            <Download className="w-3 h-3" /> PDF
                                        </a>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {reports.length === 0 && (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-gray-500">
                                    No progress reports logged yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

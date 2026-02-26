"use client";

import { useState } from "react";
import { Plus, Trophy, Calendar } from "lucide-react";
import { createImpactMilestone } from "./actions";

export default function MilestonesClient({ milestones, childrenList, currentAdminId }: { milestones: any[], childrenList: any[], currentAdminId: string }) {
    const [isCreating, setIsCreating] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const milestoneTypes = [
        "ENROLLED",
        "GRADE_PROMOTED",
        "EXAM_PASSED",
        "SCHOLARSHIP_AWARDED",
        "GRADUATED"
    ];

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        formData.append("adminId", currentAdminId);

        try {
            await createImpactMilestone(formData);
            setIsCreating(false);
            e.currentTarget.reset();
        } catch (error) {
            console.error(error);
            alert("Failed to submit milestone.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-cinematic-dark">Impact Milestones</h1>
                    <p className="text-gray-500 mt-1">Track and celebrate major life progression events for sponsored children.</p>
                </div>
                <button
                    onClick={() => setIsCreating(!isCreating)}
                    className="flex items-center gap-2 bg-trust-blue text-white px-4 py-2 rounded-lg hover:bg-trust-blue/90 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    {isCreating ? "Cancel" : "Log Milestone"}
                </button>
            </div>

            {isCreating && (
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-impact-gold" />
                        Log New Milestone
                    </h2>
                    <form onSubmit={handleCreate} className="space-y-4 max-w-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Select Child</label>
                                <select name="registryChildId" required className="w-full border rounded-lg p-2 bg-gray-50">
                                    <option value="">-- Choose --</option>
                                    {childrenList.map(c => (
                                        <option key={c.id} value={c.id}>{c.displayName}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Milestone Category</label>
                                <select name="milestoneType" required className="w-full border rounded-lg p-2 bg-gray-50">
                                    <option value="">-- Select Type --</option>
                                    {milestoneTypes.map(t => (
                                        <option key={t} value={t}>{t.replace("_", " ")}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Achievement Description</label>
                                <textarea name="description" required rows={2} className="w-full border rounded-lg p-2 bg-gray-50" placeholder="e.g. Completed Primary Education with honors..." />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date Achieved</label>
                                <input type="date" name="achievedAt" required className="w-full border rounded-lg p-2 bg-white" />
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button disabled={isSubmitting} type="submit" className="bg-cinematic-dark text-white px-6 py-2 rounded-lg font-bold hover:bg-black transition-colors disabled:opacity-50">
                                {isSubmitting ? "Logging..." : "Log Milestone"}
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
                            <th className="p-4">Type</th>
                            <th className="p-4">Description</th>
                            <th className="p-4">Achieved</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {milestones.map((m) => (
                            <tr key={m.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="p-4 font-medium text-cinematic-dark">
                                    {m.registryChild.displayName}
                                </td>
                                <td className="p-4">
                                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold font-mono">
                                        {m.milestoneType}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-600 max-w-md truncate">{m.description}</td>
                                <td className="p-4 text-gray-500 text-xs">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(m.achievedAt).toLocaleDateString()}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {milestones.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-gray-500">
                                    No milestones tracked yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

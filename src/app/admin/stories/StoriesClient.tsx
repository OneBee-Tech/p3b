"use client";

import { useState } from "react";
import { Globe, Plus, Trash2, Edit2, CheckCircle, XCircle } from "lucide-react";
import { createImpactStory, deleteImpactStory } from "./actions";

export default function StoriesClient({ stories }: { stories: any[] }) {
    const [isAdding, setIsAdding] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleAddStory(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);

        try {
            await createImpactStory(formData);
            alert("Impact story published successfully!");
            setIsAdding(false);
        } catch (error: any) {
            alert(error.message || "Failed to publish story.");
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this story? This cannot be undone.")) return;

        try {
            await deleteImpactStory(id);
            alert("Story deleted.");
        } catch (error: any) {
            alert(error.message || "Failed to delete story.");
        }
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-white mb-2 flex items-center gap-3">
                        <Globe className="w-8 h-8 text-impact-gold" />
                        Impact Stories CMS
                    </h1>
                    <p className="text-white/60">Publish general field updates and success stories to the public Impact page.</p>
                </div>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="flex items-center gap-2 px-4 py-2 bg-impact-gold hover:bg-impact-gold/90 text-cinematic-dark rounded-xl font-bold transition-colors"
                >
                    {isAdding ? <XCircle className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    {isAdding ? "Cancel" : "New Story"}
                </button>
            </div>

            {/* Add Story Form */}
            {isAdding && (
                <form onSubmit={handleAddStory} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                    <h2 className="text-xl font-bold text-white mb-4">Create New Impact Story</h2>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/70">Story Title</label>
                        <input type="text" name="title" required className="w-full bg-cinematic-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-trust-blue" placeholder="e.g., Clean Water Initiative Reaches 500 Families" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/70">Image URL (Optional)</label>
                        <input type="url" name="imageUrl" className="w-full bg-cinematic-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-trust-blue" placeholder="https://..." />
                        <p className="text-xs text-white/40">Provide a secure CDN link (e.g., Cloudinary) for the story's cover image.</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/70">Story Content</label>
                        <textarea name="content" required rows={6} className="w-full bg-cinematic-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-trust-blue resize-none" placeholder="Write the full story here..."></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70">Publishing Status</label>
                            <select name="status" className="w-full bg-cinematic-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-trust-blue">
                                <option value="DRAFT">Draft</option>
                                <option value="PUBLISHED">Published</option>
                                <option value="ARCHIVED">Archived</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70">Scheduled Publish Date (Optional)</label>
                            <input type="datetime-local" name="publishAt" className="w-full bg-cinematic-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-trust-blue [color-scheme:dark]" />
                        </div>
                    </div>

                    <div className="bg-white/5 p-4 rounded-xl border border-impact-gold/20 space-y-4">
                        <h3 className="text-sm font-bold text-impact-gold mb-2">Safeguarding & Governance</h3>
                        <div className="flex items-center gap-3">
                            <input type="checkbox" name="guardianConsent" id="guardianConsent" value="true" className="w-4 h-4 cursor-pointer" />
                            <label htmlFor="guardianConsent" className="text-sm text-white/80 cursor-pointer">Guardian Consent Verified</label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/70">Consent Document URL</label>
                                <input type="url" name="consentDocumentUrl" className="w-full bg-cinematic-dark border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-trust-blue text-sm" placeholder="https://drive..." />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/70">Consent Expiry Date</label>
                                <input type="date" name="consentExpiry" className="w-full bg-cinematic-dark border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-trust-blue text-sm [color-scheme:dark]" />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-6 py-2 bg-trust-blue hover:bg-trust-blue/90 disabled:opacity-50 text-white rounded-xl font-bold transition-colors">
                            {isSubmitting ? "Publishing..." : "Publish Story"}
                        </button>
                    </div>
                </form>
            )}

            {/* Stories List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stories.length === 0 && !isAdding && (
                    <div className="col-span-full py-12 text-center bg-white/5 border border-white/10 rounded-2xl">
                        <p className="text-white/50">No field stories published yet. Click "New Story" to add one.</p>
                    </div>
                )}

                {stories.map(story => (
                    <div key={story.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group hover:border-white/20 transition-all flex flex-col">
                        {story.imageUrl ? (
                            <div className="h-48 w-full bg-cinematic-dark overflow-hidden">
                                <img src={story.imageUrl} alt={story.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                        ) : (
                            <div className="h-48 w-full bg-cinematic-dark flex items-center justify-center border-b border-white/10">
                                <Globe className="w-12 h-12 text-white/10" />
                            </div>
                        )}

                        <div className="p-5 flex-grow flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-white text-lg leading-tight line-clamp-2">{story.title}</h3>
                                    {story.status === "PUBLISHED" ? (
                                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 shrink-0 flex items-center gap-1">
                                            {story.publishAt && new Date(story.publishAt) > new Date() ? "Scheduled" : "Published"}
                                        </span>
                                    ) : (
                                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-white/10 text-white/50 shrink-0">
                                            {story.status}
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-white/60 line-clamp-3 mb-4">{story.content}</p>
                            </div>

                            <div className="flex flex-col gap-3 pt-4 border-t border-white/10 text-xs text-white/50">
                                {story.guardianConsent ? (
                                    <div className="flex items-center gap-2 text-impact-gold">
                                        <CheckCircle className="w-3 h-3" /> Consent Verified
                                        {story.consentExpiry && new Date(story.consentExpiry) < new Date() && (
                                            <span className="text-red-400 ml-auto font-bold">(EXPIRED)</span>
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-red-400">
                                        <XCircle className="w-3 h-3" /> No Consent Logged
                                    </div>
                                )}
                                <div className="flex items-center justify-between mt-2">
                                    <span>Added {new Date(story.createdAt).toLocaleDateString()}</span>
                                    <button onClick={() => handleDelete(story.id)} className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

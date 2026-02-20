'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface AllocationProps {
    tuition: number;
    supplies: number;
    infrastructure: number;
    ops: number;
}

const COLORS = ['#204066', '#d9a944', '#10b981', '#6b7280']; // Trust Blue, Impact Gold, Emerald, Gray

export function AllocationPieChart({ tuition, supplies, infrastructure, ops }: AllocationProps) {
    const data = [
        { name: 'Tuition & Teaching', value: tuition },
        { name: 'Books & Supplies', value: supplies },
        { name: 'Infrastructure', value: infrastructure },
        { name: 'Field Operations', value: ops },
    ].filter(item => item.value > 0);

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 rounded shadow-lg border border-gray-100 text-sm">
                    <p className="font-bold text-cinematic-dark mb-1">{payload[0].name}</p>
                    <p className="text-gray-600">${payload[0].value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</p>
                </div>
            );
        }
        return null;
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
        </ResponsiveContainer>
    );
}

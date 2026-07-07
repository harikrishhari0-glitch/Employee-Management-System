import React from 'react';
import { STATUS_COLORS } from '../constants';

const StatusBadge = ({ status }) => {
    const colorClass = STATUS_COLORS[status] || "bg-gray-100 text-gray-800";
    return (
        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${colorClass}`}>
            {status}
        </span>
    );
};

export default StatusBadge;

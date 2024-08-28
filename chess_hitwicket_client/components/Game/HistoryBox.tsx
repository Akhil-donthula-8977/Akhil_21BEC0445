import React, { useState, useRef, useEffect } from 'react';
interface HistoryBoxProps {
    moves: string[];
}

const HistoryBox: React.FC<HistoryBoxProps> = ({ moves }) => {
    const [items, setItems] = useState<string[]>(moves);
    const scrollableDivRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (scrollableDivRef.current) {
            scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight;
        }
    }, [items]);

    return (
        <div className="relative m-1 w-[150px] border border-gray-300 rounded-b-[5px] rounded-t-[5px] ">
            <div className='bg-orange-800 text-white p-1 rounded-t-[5px] px-2'>History</div>
            <div
                ref={scrollableDivRef}
                className=" p-2 overflow-y-auto rounded"
                style={{ maxHeight: '200px' }} // Set max height for scrollable area
            >
                {moves.map((item, index) => (
                    <div
                        key={index}
                        className=" mb-1  rounded"
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HistoryBox;

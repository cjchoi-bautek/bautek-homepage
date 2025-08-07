import React, { useState, useEffect, useRef } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

const frames = [
    {
        id: "BPF130",
        images: [
            "/Products/BPF130(27T)IN_render/1.png",
            "/Products/BPF130(27T)IN_render/2.png",
            "/Products/BPF130(27T)IN_render/3.png",
        ],
        specs: [
            ["프레임폭", "130mm"],
            ["패널두께", "27mm ~ 47mm"],
            ["열관류율", "1.170 W/㎡·K ~ 0.759 W/㎡·K"],
            ["기밀성", "1등급"],
            ["차음재", "유"],
        ],
    },
    {
        id: "BPF150",
        images: [
            "/Products/BPF150(27T)IN_render/1.png",
            "/Products/BPF150(27T)IN_render/2.png",
            "/Products/BPF150(27T)IN_render/3.png"
        ],
        specs: [
            ["프레임폭", "150mm"],
            ["패널두께", "27mm ~ 47mm"],
            ["열관류율", "1.196 W/㎡·K (27mm 기준) "],
            ["기밀성", "1등급"],
            ["차음재", "유"],
        ],
    },
    {
        id: "BPF180",
        images: [
            "/Products/BPF180(47T)IN_render/1.png",
            "/Products/BPF180(47T)IN_render/2.png",
            "/Products/BPF180(47T)IN_render/3.png"
        ],
        specs: [
            ["프레임폭", "180mm"],
            ["패널두께", "27mm ~ 47mm"],
            ["열관류율", "0.625 W/㎡·K (47mm 기준)"],
            ["기밀성", "1등급"],
            ["차음재", "유"],
        ],
    },
    {
        id: "BPF180 (100)",
        images: [
            "/Products/BPF180(100)(27T)IN_render/1.png",
            "/Products/BPF180(100)(27T)IN_render/2.png",
            "/Products/BPF180(100)(27T)IN_render/3.png"
        ],
        specs: [
            ["프레임폭", "3면 180mm / 하부 100mm"],
            ["패널두께", "27mm ~ 47mm"],
            ["열관류율", "1.063 W/㎡·K ~ 0.732 W/㎡·K"],
            ["기밀성", "1등급"],
            ["차음재", "유"],
        ],
    },
    {
        id: "BPF180-1",
        images: [
            "/Products/BPF180-1(47T)IN_render/1.png",
            "/Products/BPF180-1(47T)IN_render/2.png",
            "/Products/BPF180-1(47T)IN_render/3.png"
        ],
        specs: [
            ["프레임폭", "180mm"],
            ["패널두께", "27mm ~ 47mm"],
            ["열관류율", "0.846 W/㎡·K ~ 0.753 W/㎡·K"],
            ["기밀성", "1등급"],
            ["차음재", "유"],
        ],
    },
    {
        id: "BPF240 (130)",
        images: [
            "/Products/BPF240(130)(27T)IN_render/1.png",
            "/Products/BPF240(130)(27T)IN_render/2.png",
            "/Products/BPF240(130)(27T)IN_render/3.png"
        ],
        specs: [
            ["프레임폭", "3면 240mm / 하부 130mm"],
            ["패널두께", "27mm"],
            ["열관류율", "1.105 W/㎡·K"],
            ["기밀성", "1등급"],
            ["차음재", "유"],
        ],
    },
];

const CanvasImageWithWatermark = ({ src, alt, watermarkText, ...props }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        const image = new Image();
        image.src = src;
        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0);

            if (watermarkText) {
                const fontSize = Math.min(canvas.width * 0.3, canvas.height * 0.3, 150); //
                context.font = `bold ${fontSize}px Arial`;
                context.fillStyle = 'rgba(0, 0, 0, 0.15)'; // 더 흐릿하게 만듦
                context.textAlign = 'center';
                context.textBaseline = 'middle';

                const angle = Math.atan2(canvas.height, canvas.width);

                // 첫 번째 라인 (오른쪽 위에서 왼쪽 아래로)
                context.save();
                context.translate(canvas.width / 2, canvas.height / 2);
                context.rotate(angle);
                context.fillText(watermarkText, 20, 0); // 위치 조정
                context.restore();

                // 두 번째 라인 (왼쪽 위에서 오른쪽 아래로)
                context.save();
                context.translate(canvas.width / 2, canvas.height / 2);
                context.rotate(-angle);
                context.fillText(watermarkText, -20, 0); // 위치 조정
                context.restore();
            }
        };
    }, [src, watermarkText]);

    return <canvas ref={canvasRef} {...props} />;
};

export default function FramePopup({ isOpen, onClose, activeFrameId }) {
    const [selectedFrame, setSelectedFrame] = useState(frames?.[0]);
    const [currentImage, setCurrentImage] = useState(0);
    const [openImageModal, setOpenImageModal] = useState(false);
    const [selectedBigImage, setSelectedBigImage] = useState('');

    const watermarkText = "Confidential";
    const legalText = "Copyright © 2025. (주)바우텍. All Rights Reserved.\n본 이미지는 저작권법의 보호를 받으며 무단 사용 시 법적 처벌을 받을 수 있습니다.";

    useEffect(() => {
        const found = frames?.find((f) => f.id === activeFrameId);
        if (found) {
            setSelectedFrame(found);
            setCurrentImage(0);
        }
    }, [activeFrameId, frames]);

    const onOpenImageModal = (imageSrc) => {
        setSelectedBigImage(imageSrc);
        setOpenImageModal(true);
    };

    const onCloseImageModal = () => {
        setOpenImageModal(false);
        setSelectedBigImage('');
    };

    const handleRightClick = (e) => {
        e.preventDefault();
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
            <Dialog.Panel className="relative bg-white rounded-lg shadow-xl w-[95vw] max-w-7xl p-4 sm:p-6 overflow-y-auto max-h-[95vh]">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black">
                    <X size={24} />
                </button>

                <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                    {frames?.map((frame) => (
                        <button
                            key={frame.id}
                            onClick={() => {
                                setSelectedFrame(frame);
                                setCurrentImage(0);
                            }}
                            className={`px-3 py-1.5 text-xs sm:text-sm font-semibold border rounded-md hover:bg-gray-100 whitespace-nowrap ${
                                selectedFrame?.id === frame.id ? "bg-[#004A91] text-white" : "text-gray-800"
                            }`}
                        >
                            {frame.id}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-start">
                    <div
                        className="relative w-full h-[300px] md:h-[500px] border rounded-md flex items-center justify-center bg-white overflow-hidden cursor-pointer"
                        onClick={() => onOpenImageModal(selectedFrame?.images?.[currentImage])}
                        onContextMenu={handleRightClick}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedFrame?.images?.[currentImage]}
                                className="w-full h-full flex items-center justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <CanvasImageWithWatermark
                                    src={selectedFrame?.images?.[currentImage]}
                                    alt="Frame Detail"
                                    watermarkText={watermarkText}
                                    className="max-h-full max-w-full object-contain"
                                />
                            </motion.div>
                        </AnimatePresence>
                        <div className="absolute bottom-2 left-0 w-full text-center text-xs text-gray-600 break-words">
                            {legalText.split('\n').map((line, index) => (
                                <p key={index}>{line}</p>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col justify-center h-full">
                        <table className="w-full border-t border-b text-sm">
                            <tbody>
                                {selectedFrame?.specs?.map(([label, value]) => (
                                    <tr key={label} className="border-t">
                                        <td className="py-2 pr-2 sm:pr-4 font-medium text-gray-600 whitespace-nowrap w-1/3 text-xs sm:text-sm">{label}</td>
                                        <td className="py-2 text-gray-900 text-xs sm:text-sm">{value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {selectedFrame?.images?.map((img, idx) => (
                        <div
                            key={idx}
                            onClick={() => setCurrentImage(idx)}
                            onContextMenu={handleRightClick}
                            className={`w-12 h-12 sm:w-16 sm:h-16 border rounded-md cursor-pointer transition-transform duration-300 hover:scale-105 overflow-hidden ${
                                currentImage === idx ? "border-[#004A91]" : "border-gray-300"
                            }`}
                        >
                            <CanvasImageWithWatermark
                                src={img}
                                alt={`Thumbnail ${idx}`}
                                watermarkText={""}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </Dialog.Panel>

            <Modal open={openImageModal} onClose={onCloseImageModal} center classNames={{
                modal: 'customBigImageModal',
            }}>
                <div onContextMenu={handleRightClick} className="relative">
                    <CanvasImageWithWatermark
                        src={selectedBigImage}
                        alt="확대된 이미지"
                        watermarkText={watermarkText}
                        className="max-w-full max-h-[80vh] object-contain"
                    />
                    <div className="absolute bottom-2 left-0 w-full text-center text-xs text-gray-600 break-words">
                        {legalText.split('\n').map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
                    </div>
                </div>
            </Modal>
        </Dialog>
    );
}
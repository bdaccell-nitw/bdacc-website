export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050510]">
            <div className="relative w-24 h-24">
                {/* Outer spinning ring */}
                <div className="absolute inset-0 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                {/* Inner pulsing core */}
                <div className="absolute inset-4 bg-blue-500/40 rounded-full animate-pulse blur-sm"></div>
            </div>
            <p className="mt-8 text-blue-400 font-mono text-sm tracking-[0.2em] animate-pulse">
                LOADING
            </p>
        </div>)
};
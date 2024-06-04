const AnimatedBg = () => {
    return (
        <div className="relative w-full max-w-lg -z-10">
            {/* purple circle */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-violet-300 rounded-full mix-blend-multiply filter  blur-xl opacity-50 animate-blob animation-delay-2000"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
            <div className="absolute top-4 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-5000"></div>
        </div>
    )
}

export default AnimatedBg;
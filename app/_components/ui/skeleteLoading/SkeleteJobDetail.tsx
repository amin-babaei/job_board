
const SkeleteJobDetail = () => {
    return (
        <section className="container mx-auto my-10 px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                
                <div className="md:col-span-2 bg-card p-10 rounded-lg animate-pulse">

                    <div className="flex items-center gap-4 mb-8">
                        <div className="bg-gray-300 rounded-full w-16 h-16" />
                        <div className="space-y-3">
                            <div className="h-8 bg-gray-300 rounded w-64" />
                            <div className="h-4 bg-gray-300 rounded w-48" />
                        </div>
                    </div>

                    <div className="h-10 bg-gray-300 rounded w-full max-w-lg mb-10" />

                    <div className="flex flex-wrap gap-5 mb-10">
                        <div className="h-8 bg-gray-400 rounded-full w-32" />
                        <div className="h-8 bg-gray-400 rounded-full w-40" />
                        <div className="h-8 bg-gray-400 rounded-full w-36" />
                        <div className="h-8 bg-gray-400 rounded-full w-48" />
                    </div>

                    <div className="h-8 bg-gray-300 rounded w-64 mb-6" />

                    <div className="space-y-4">
                        <div className="h-4 bg-gray-300 rounded w-full" />
                        <div className="h-4 bg-gray-300 rounded w-full" />
                        <div className="h-4 bg-gray-300 rounded w-11/12" />
                        <div className="h-4 bg-gray-300 rounded w-full" />
                        <div className="h-4 bg-gray-300 rounded w-10/12" />
                        <div className="h-4 bg-gray-300 rounded w-full" />
                        <div className="h-4 bg-gray-300 rounded w-9/12" />
                    </div>
                </div>
                <div className="md:sticky md:top-24 md:self-start">
                    <div className="bg-card border border-border-main rounded-lg p-6 shadow-soft animate-pulse">
                        <div className="h-8 bg-gray-300 rounded w-48 mx-auto mb-6" />

                        <div className="h-12 bg-gray-400 rounded-lg w-full" />

                        <div className="h-4 bg-gray-300 rounded w-64 mx-auto mt-6" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SkeleteJobDetail

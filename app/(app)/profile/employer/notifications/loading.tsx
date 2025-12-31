const loading = () => {
    return (
        <div className="container mx-auto py-20 animate-pulse">

            <div className="flex justify-between items-center mb-8">
                <div className="h-10 w-64 bg-muted/30 rounded" />
                <div className="h-10 w-48 bg-muted/30 rounded" />
            </div>

            <div className="space-y-6">
                {[1, 2].map((i) => (
                    <div
                        key={i}
                        className="bg-card rounded-lg p-6 shadow-soft border-l-4 border-transparent"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 space-y-4">

                                <div className="h-6 w-3/4 bg-muted/30 rounded" />

                                <div className="space-y-2">
                                    <div className="h-4 w-full bg-muted/30 rounded" />
                                    <div className="h-4 w-5/6 bg-muted/30 rounded" />
                                </div>

                                <div className="h-4 w-1/2 bg-muted/30 rounded mt-4" />

                                <div className="h-3 w-32 bg-muted/30 rounded mt-6" />
                            </div>

                            <div className="flex flex-col items-end gap-3">
                                <div className="h-6 w-16 bg-muted/30 rounded-full" />
                                <div className="h-10 w-24 bg-muted/30 rounded" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default loading
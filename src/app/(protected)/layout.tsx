import RouteGuard from "@/components/RouteGuard";


export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <RouteGuard>
            <div className="min-h-screen bg-background">
                <main className="container mx-auto px-20 py-10">
                    {/* You can now use allWeeks data */}
                    {children}
                </main>
            </div>
        </RouteGuard>
    );
}
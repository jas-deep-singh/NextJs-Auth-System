export default async function UserProfile({params}: any) {
    const resolvedParams = await params;
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page {resolvedParams.id}</p>
        </div>
    )
}
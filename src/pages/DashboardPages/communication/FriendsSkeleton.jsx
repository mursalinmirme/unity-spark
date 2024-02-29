
const FriendsSkeleton = () => {
    return (
        <div className="grid gap-3">
            <div className="flex gap-3 items-center">
                <div className="skeleton w-12 h-12 rounded-full"></div>
                <div className="space-y-3">
                    <div className="skeleton h-4 w-40"></div>
                    <div className="skeleton h-3 w-28"></div>
                </div>
            </div>
            <div className="flex gap-3 items-center">
                <div className="skeleton w-12 h-12 rounded-full"></div>
                <div className="space-y-3">
                    <div className="skeleton h-4 w-40"></div>
                    <div className="skeleton h-3 w-28"></div>
                </div>
            </div>
            <div className="flex gap-3 items-center">
                <div className="skeleton w-12 h-12 rounded-full"></div>
                <div className="space-y-3">
                    <div className="skeleton h-4 w-40"></div>
                    <div className="skeleton h-3 w-28"></div>
                </div>
            </div>
            <div className="flex gap-3 items-center">
                <div className="skeleton w-12 h-12 rounded-full"></div>
                <div className="space-y-3">
                    <div className="skeleton h-4 w-40"></div>
                    <div className="skeleton h-3 w-28"></div>
                </div>
            </div>
        </div>
    );
};

export default FriendsSkeleton;
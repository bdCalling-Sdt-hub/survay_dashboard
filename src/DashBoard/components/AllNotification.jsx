import { useState } from 'react';

function AllNotification() {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: 'WHY Completion Alert',
            description: 'Jane Smith has completed the "Discover Your Purpose" WHY.',
            date: '2024-12-14 08:00 AM',
        },
        {
            id: 2,
            title: 'Donation Alert',
            description: 'Jane Smith has made a donation of $50 to support FindYourWhy.',
            date: '2024-12-14 08:00 AM',
        },
        {
            id: 3,
            title: 'WHY Completion Alert',
            description: 'Jane Smith has completed the "Discover Your Purpose" WHY.',
            date: '2024-12-14 08:00 AM',
        },
        {
            id: 4,
            title: 'WHY Completion Alert',
            description: 'Jane Smith has completed the "Discover Your Purpose" WHY.',
            date: '2024-12-14 08:00 AM',
        },
    ]);

    const deleteNotification = (id) => {
        setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    };

    return (
        <div id='notification' className="w-96  bg-gray-200 p-2 rounded-lg max-h-screen overflow-y-scroll">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Notification</h2>
                <button
                    onClick={() => setNotifications([])}
                    className="text-sm text-red-500 hover:text-red-700"
                >
                    Clear All
                </button>
            </div>
            <div className="flex flex-col gap-4">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className="flex items-center gap-3 p-4  hover:bg-gray-100 transition"
                    >
                        {/* Avatar */}
                        <div>
                            <img
                                src="https://randomuser.me/api/portraits/women/44.jpg"
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full"
                            />
                        </div>

                        {/* Notification Content */}
                        <div className="flex-1">
                            <h3 className="font-semibold">{notification.title}</h3>
                            <p className="text-sm text-gray-600">{notification.description}</p>
                            <p className="text-xs text-gray-400">{notification.date}</p>
                        </div>

                        {/* Delete Button */}
                        <button
                            className="text-gray-400 hover:text-gray-600"
                            onClick={() => deleteNotification(notification.id)}
                        >
                            ✕
                        </button>
                    </div>
                ))}

                {notifications.length === 0 && (
                    <p className="text-gray-500 text-center">No notifications available</p>
                )}
            </div>
        </div>
    );
}

export default AllNotification;

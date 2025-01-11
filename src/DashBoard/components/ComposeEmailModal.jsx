
import { Modal, Input, Button, Tooltip } from 'antd';
import { SendOutlined, DeleteOutlined, MoreOutlined, LinkOutlined, PaperClipOutlined, SmileOutlined, WarningOutlined, LockOutlined, PictureOutlined, EditOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const ComposeEmailModal = ({ isModalVisible, setIsModalVisible, selectedRecord }) => {
    const [to, setTo] = useState(selectedRecord?.address || '');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (!to || !subject || !message) {
            Swal.fire({
                icon: 'error',
                title: 'Failed to Send',
                text: 'Please fill in all fields before sending.',
            });
            return;
        }

        Swal.fire({
            icon: 'success',
            title: 'Email Sent',
            text: 'Your email has been successfully sent!',
        });

        setIsModalVisible(false);
        setTo('');
        setSubject('');
        setMessage('');
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setTo('');
        setSubject('');
        setMessage('');
    };

    const handleAttachFile = () => {
        Swal.fire({
            icon: 'info',
            title: 'Attach File',
            text: 'File attachment functionality coming soon!',
        });
    };

    const handleAddLink = () => {
        Swal.fire({
            input: 'url',
            inputLabel: 'Enter URL',
            inputPlaceholder: 'https://example.com',
            showCancelButton: true,
            confirmButtonText: 'Add Link',
        }).then((result) => {
            if (result.isConfirmed) {
                const url = result.value;
                if (url) {
                    setMessage((prev) => `${prev}\n${url}`);
                    Swal.fire('Added!', 'Your link has been added.', 'success');
                }
            }
        });
    };

    const handleInsertEmoji = () => {
        setMessage((prev) => prev + ' 😊');
    };

    const handleWarning = () => {
        Swal.fire({
            icon: 'warning',
            title: 'Warning',
            text: 'Ensure the email content is appropriate before sending.',
        });
    };

    const handleAddPicture = () => {
        Swal.fire({
            icon: 'info',
            title: 'Add Picture',
            text: 'Picture insertion functionality coming soon!',
        });
    };

    const handleLockEmail = () => {
        Swal.fire({
            icon: 'info',
            title: 'Lock Email',
            text: 'Email encryption is enabled for this message.',
        });
    };

    const handleEditOptions = () => {
        Swal.fire({
            icon: 'info',
            title: 'Edit Options',
            text: 'Edit options functionality coming soon!',
        });
    };

    return (
        <Modal
            title="New Message"
            open={isModalVisible}
            onCancel={handleCancel}
            footer={null}
            width={600}
            style={{ top: 20 }}
        >
            {/* To Input */}
            <div className="mb-4">
                <Input
                    placeholder="To"
                    value={to}
                    type="email"
                    onChange={(e) => setTo(e.target.value)}
                    addonAfter={<a href="#">Cc Bcc</a>}
                    size="large"
                    className="rounded-lg"
                />
            </div>

            {/* Subject Input */}
            <div className="mb-4">
                <Input
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    size="large"
                    className="rounded-lg"
                />
            </div>

            {/* Message Body */}
            <div className="mb-4">
                <Input.TextArea
                    rows={8}
                    placeholder="Compose your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="rounded-lg"
                />
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-between items-center">
                {/* Left Actions */}
                <div className="flex items-center space-x-3">
                    <Button
                        type="primary"
                        icon={<SendOutlined />}
                        onClick={handleSend}
                        className="flex items-center justify-center rounded-lg"
                    >
                        Send
                    </Button>
                    <Button
                        icon={<DeleteOutlined />}
                        type="text"
                        danger
                        onClick={handleCancel}
                        className="flex items-center justify-center"
                    >
                        Discard
                    </Button>
                </div>

                {/* Right Actions */}
                <div className="flex space-x-2">
                    <Tooltip title="Attach File">
                        <Button icon={<PaperClipOutlined />} shape="circle" type="text" onClick={handleAttachFile} />
                    </Tooltip>
                    <Tooltip title="Add Link">
                        <Button icon={<LinkOutlined />} shape="circle" type="text" onClick={handleAddLink} />
                    </Tooltip>
                    <Tooltip title="Insert Emoji">
                        <Button icon={<SmileOutlined />} shape="circle" type="text" onClick={handleInsertEmoji} />
                    </Tooltip>
                    <Tooltip title="Warning">
                        <Button icon={<WarningOutlined />} shape="circle" type="text" onClick={handleWarning} />
                    </Tooltip>
                    <Tooltip title="Add Picture">
                        <Button icon={<PictureOutlined />} shape="circle" type="text" onClick={handleAddPicture} />
                    </Tooltip>
                    <Tooltip title="Lock Email">
                        <Button icon={<LockOutlined />} shape="circle" type="text" onClick={handleLockEmail} />
                    </Tooltip>
                    <Tooltip title="Edit Options">
                        <Button icon={<EditOutlined />} shape="circle" type="text" onClick={handleEditOptions} />
                    </Tooltip>
                    <Tooltip title="More Options">
                        <Button icon={<MoreOutlined />} shape="circle" type="text" />
                    </Tooltip>
                </div>
            </div>
        </Modal>
    );
};

export default ComposeEmailModal;

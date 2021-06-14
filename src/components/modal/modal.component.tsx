import React from 'react';

interface ModalProps {
	children: React.ReactNode;
}
export default function Modal(props: ModalProps) {
	const { children } = props;
	return (
		<div className="modal flex justify-center items-center fixed top-0 bottom-0 right-0 left-0" style={{
			backgroundColor: 'rgba(0,0,0,0.4)',
			backdropFilter: 'blur(4px)'
		}}>
			<div className="bg-gray-50 w-full md:w-2/3">
				{children}
			</div>
		</div>
	);
}
export interface User {
	id: string;
	email: string;
	name?: string;
	full_name?: string;
	first_name?: string;
	last_name?: string;
	phone_number?: string;
	hashed_password: string;
	role: 'admin' | 'member' | 'guest';
	isActive: boolean;
	createdAt: string;
}


export const navItems = [
	{ label: 'Overview', path: '/overview', icon: 'grid' },
	{ label: 'Academic Ledger', path: '/ledger', icon: 'ledger' },
	{ label: 'Student Registry', path: '/students', icon: 'users' },
	{ label: 'Faculty Portal', path: '/faculty', icon: 'cap' },
	{ label: 'Claims & Billing', path: '/claims', icon: 'card' },
] as const

export type NavItem = (typeof navItems)[number]

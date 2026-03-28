import { Alert, Admin } from '@/types/alert';

export const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'Emergency: Water Main Break on Main Street',
    message: 'A water main break has occurred on Main Street near the Geronimo Community Center. Crews are on site. Please avoid the area and expect water service interruption for the next 4-6 hours. Updates will follow.',
    category: 'emergency',
    priority: 'high',
    author: 'Mayor Patricia Williams',
    authorRole: 'Mayor of Geronimo',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
  },
  {
    id: '2',
    title: 'Geronimo Days Festival This Weekend',
    message: 'Join us for the Annual Geronimo Days Festival this Saturday and Sunday at the City Park! Local vendors, live country music, and activities for all ages. The event runs from 10 AM to 8 PM both days. Come celebrate our community!',
    category: 'events',
    priority: 'low',
    author: 'Council Member James Rodriguez',
    authorRole: 'Parks & Recreation Committee',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
    imageUrl: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800',
  },
  {
    id: '3',
    title: 'Street Maintenance on Highway 8',
    message: 'Starting next Monday, street maintenance will begin on Highway 8 through downtown Geronimo. Please use alternate routes during work hours (8 AM - 5 PM) and expect minor delays.',
    category: 'maintenance',
    priority: 'medium',
    author: 'Geronimo Public Works',
    authorRole: 'City Services',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    read: true,
  },
  {
    id: '4',
    title: 'New Recycling Program Launch',
    message: 'We are excited to announce our expanded recycling program! Starting next month, we will accept additional materials including soft plastics and electronics. Information packets will be mailed to all Geronimo residents.',
    category: 'news',
    priority: 'medium',
    author: 'Council Member Maria Santos',
    authorRole: 'Environmental Committee',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
  },
  {
    id: '5',
    title: 'Town Hall Meeting - Budget Discussion',
    message: 'Please join us for a town hall meeting on Thursday at 7 PM at Geronimo City Hall. We will be discussing the proposed budget for the upcoming fiscal year. Your input is valuable to our community!',
    category: 'general',
    priority: 'medium',
    author: 'Mayor Patricia Williams',
    authorRole: 'Mayor of Geronimo',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    read: true,
  },
  {
    id: '6',
    title: 'Animal Control: Stray Dogs Reported',
    message: 'Multiple reports of stray dogs in the residential area near 4th Street. Animal Control Officer is investigating. Please do not approach unknown animals and report any sightings to City Hall.',
    category: 'animal-control',
    priority: 'medium',
    author: 'Officer Mike Thompson',
    authorRole: 'Animal Control Officer',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    read: false,
  },
];

export const mockAdmins: Admin[] = [
  {
    id: 'admin1',
    name: 'Mayor Patricia Williams',
    role: 'Mayor',
    department: 'Executive Office',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
  },
  {
    id: 'admin2',
    name: 'James Rodriguez',
    role: 'Council Member',
    department: 'Parks & Recreation Committee',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
  },
  {
    id: 'admin3',
    name: 'Maria Santos',
    role: 'Council Member',
    department: 'Environmental Committee',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
  },
  {
    id: 'admin4',
    name: 'Geronimo Public Works',
    role: 'Department',
    department: 'City Services',
  },
  {
    id: 'admin5',
    name: 'Officer Mike Thompson',
    role: 'Animal Control Officer',
    department: 'Animal Control',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
  },
];
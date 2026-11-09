// Store facts used across the page. One place to change the number or hours.

export const PHONE = "6281996535525";
export const PHONE_DISPLAY = "+62 819-9653-5525";
export const TEL_URL = `tel:+${PHONE}`;
export const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Toko+Sepeda+AL+Cikande+Permai";
export const DIRECTIONS_URL = "https://www.google.com/maps/dir/?api=1&destination=Toko+Sepeda+AL+Cikande+Permai";
export const CATALOG_URL = `https://wa.me/c/${PHONE}`;

/**
 * Social media accounts. `primary` ones get a large button in the Gallery follow block;
 * the rest show as small icons. Footer and mobile menu list them all.
 */
export const SOCIALS = [
	{ name: "Instagram", handle: "@tokoal_id", href: "https://www.instagram.com/tokoal_id", icon: "brands:instagram", primary: true },
	{ name: "TikTok", handle: "@tokoal.id", href: "https://www.tiktok.com/@tokoal.id", icon: "brands:tiktok", primary: true },
	{ name: "YouTube", handle: "@tokoal_id", href: "https://www.youtube.com/@tokoal_id", icon: "brands:youtube", primary: false },
	{ name: "Facebook", handle: "admintokoalid", href: "https://www.facebook.com/admintokoalid", icon: "brands:facebook-f", primary: false },
];

/** WhatsApp chat link with the message already typed in, so the visitor only has to press send. */
export function wa(text: string): string {
	return `https://api.whatsapp.com/send?phone=${PHONE}&text=${encodeURIComponent(text)}`;
}

// Ready-made opening lines, one per place a visitor can start a chat
export const WA = {
	general: wa("Halo Toko AL, saya lihat dari website. Mau tanya-tanya dulu."),
	service: wa("Halo Toko AL, saya mau konsultasi servis sepeda. Keluhannya: "),
	order: wa("Halo Toko AL, saya mau pesan lewat WhatsApp. Produknya: "),
	visit: wa("Halo Toko AL, saya mau datang ke toko. Mau tanya dulu: "),
	product: (name: string) => wa(`Halo Toko AL, saya lihat ${name} di website. Mau tanya harga dan stoknya.`),
};

/**
 * Opening hours in WIB. Index = day of week, 0 = Sunday. Times in minutes after midnight.
 * Same data as the schema.org block in Layout.astro.
 */
export const HOURS: { open: number; close: number }[] = [
	{ open: 9 * 60, close: 17 * 60 }, // Minggu
	{ open: 9 * 60, close: 20 * 60 }, // Senin
	{ open: 9 * 60, close: 20 * 60 },
	{ open: 9 * 60, close: 20 * 60 },
	{ open: 9 * 60, close: 20 * 60 },
	{ open: 9 * 60, close: 20 * 60 },
	{ open: 9 * 60, close: 20 * 60 }, // Sabtu
];

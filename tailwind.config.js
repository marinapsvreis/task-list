/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";
 
export default withMT(
	{
		content: [
			"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
			"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
			"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		],
		theme: {
			extend: {
				backgroundImage: {
					"hero-pattern": "url('/img/hero-pattern.svg')",
					"footer-texture": "url('/img/footer-texture.png')",
				}
			},
		},
		plugins: [
			// eslint-disable-next-line no-undef
			require("@tailwindcss/forms"),
		],
	}
);

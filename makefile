build:
	deno compile --allow-net -o replapi src/index.ts && ./replapi
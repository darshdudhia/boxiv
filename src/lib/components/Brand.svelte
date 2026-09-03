<script lang="ts">
	// "boχiv" wordmark. The middle glyph is the real chi (χ) —
	// the same calligraphic mark used as the logo/watermark (static/chi.svg).
	// The wordmark uses the exact green gradient from the logo.
	let { class: className = '' }: { class?: string } = $props();
</script>

<span class="brand {className}" role="img" aria-label="boXiv">
	<span class="seg seg-left">bo</span>
	<span class="chi" aria-hidden="true"></span>
	<span class="seg seg-right">iv</span>
</span>

<style>
	.brand {
		display: inline-flex;
		align-items: center;
		font-weight: 700;
		letter-spacing: -0.03em;
		line-height: 1;
	}

	.seg,
	.chi {
		/* Override the global `span { font-size: 1rem }` base rule so the
		   wordmark scales with the font-size set on .brand. */
		font-size: inherit;
		line-height: 1;
	}

	.seg {
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		color: transparent;
	}

	/* Exact green gradient used by the updated logo SVG. */
	.seg-left {
		background-image: linear-gradient(
			100deg,
			#005a2d 0%,
			#008c46 40%,
			#32b45a 70%,
			#96e1aa 88%,
			#ebfff0 100%
		);
	}

	/* Continue the same exact logo gradient across "iv". */
	.seg-right {
		background-image: linear-gradient(
			100deg,
			#005a2d 0%,
			#008c46 40%,
			#32b45a 70%,
			#96e1aa 88%,
			#ebfff0 100%
		);
	}

	/* The χ uses the exact same gradient as the logo. */
	.chi {
		display: inline-block;
		width: 0.88em;
		height: 1.02em;
		margin: 0 -0.05em;

		background: linear-gradient(
			120deg,
			#005a2d 0%,
			#008c46 40%,
			#32b45a 70%,
			#96e1aa 88%,
			#ebfff0 100%
		);

		-webkit-mask: url('/chi.svg') center / contain no-repeat;
		mask: url('/chi.svg') center / contain no-repeat;
	}
</style>

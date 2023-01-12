<template>
  <div
    class="main-wrapper h-full overflow-hidden relative"
    :class="{'max-width-wrapper': maxWidth}">
    <div class="sm:block md:hidden absolute shadow--small toc-button thin-border">
      <button @click="expanded = !expanded">
        <svg
          style="width:24px;height:24px"
          viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M3,9H17V7H3V9M3,13H17V11H3V13M3,17H17V15H3V17M19,17H21V15H19V17M19,7V9H21V7H19M19,13H21V11H19V13Z" />
        </svg>
      </button>
    </div>
    <div
      class="flex flex-row justify-start sidebar h-full overflow-hidden"
      :class="{'is-expanded': expanded}">
      <aside
        class="flex flex-col"
        style="width:100%;">
        <button
          @click="expanded = !expanded"
          type="button"
          class="button action backdrop">
          <span class="button-wrap"></span>
        </button>
        <nav class="sidebar-inner scroll">
          <div class="flex flex-col justify-start">
            <slot name="sidebar" />
          </div>
        </nav>
      </aside>
    </div>
    <div
      class="flex flex-col h-full scroll p-0 md:p-3"
      style="width:100%;overflow-y: auto;">
      <article
        class="h-full"
        :class="{'pa-0': maxWidth, 'fill-height': fullHeight}">
        <slot name="content" />
      </article>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    maxWidth: {
      type: Boolean,
      default: false
    },
    fullHeight: {
      type: Boolean,
      default: false 
    },
  },
  data(){
    return { expanded: false }
  }
}
</script>

<style lang="scss" scoped>
$maxLength: 28rem;
$maxLengthSmall: 20rem;

.toc-button{
	$paddingSize: 6px;
	top: 1vw;
	left: 1vw;
	z-index: 62;
	width: calc(28px + #{$paddingSize} + #{$paddingSize});
	height: calc(28px + #{$paddingSize} + #{$paddingSize});
	border-radius: 30px;
	padding: 4px $paddingSize;
	background-color: #fff;
}

.main-wrapper {
    width: 100%;
	display: flex;
	margin: 0 auto;
	&.max-width-wrapper{
		max-width: 1440px;
	}
}

.sidebar {
    $mid-grey: #ccc;
	--offset: var(--main-document-header-height);
	--max-height: calc(100vh - var(--offset));
	color: var(--text-secondary);
	& .backdrop {
			display: none;
	}
    aside{
        border-right: 1px solid $mid-grey;
    }
	.sidebar-inner {
        $maxHeight: calc(100vh - 4rem);
		background: #FFF;
        border-right: 1px solid $mid-grey;
		
		// height: $maxHeight;
		// max-height: $maxHeight;
		overflow: hidden;
		overflow: auto;
		padding-right: 1rem;
		// padding-left: 0rem;
		position: relative;
		transition: transform .2s linear;
		width: 80vw !important;
		max-width: $maxLengthSmall;
		will-change: transform;
	}
}

@media screen and (min-width: 769px){
	.main-wrapper {
		grid-gap: 3rem;
		display: grid;
		gap: 0;
		&.max-width-wrapper{
			gap: 3rem;
			padding-right: 3rem;
		}
		grid-template-areas: "sidebar main";
		// grid-template-columns: minmax(0,1fr) minmax(0,2fr);
		grid-template-columns: minmax(0, $maxLengthSmall) minmax(0,2fr);
		// padding-left: 1.5rem;
		.sidebar {
			align-self: start;
			grid-area: sidebar;
			display: flex;
			max-height: calc(100vh - 6rem);
			overflow-y: auto;
			position: -webkit-sticky;
			position: sticky;
			top: 1rem; //  6rem;
		}
	}
}
@media screen and (min-width: 1100px){
	.main-wrapper {
		grid-gap: 3rem;
		display: grid;
		gap: 0;
		&.max-width-wrapper{
			gap: 3rem;
			padding-right: 1rem;
		}
		grid-template-areas: "sidebar main";
		grid-template-columns: minmax(0,$maxLength) minmax(0,2.5fr); // minmax(0,15rem);
		padding-left: 0; // 1rem;
		.sidebar .sidebar-inner {
			max-width: $maxLength;
		}
	}
}

article{
	display: flow-root;
	// min-height: 80vh;
}

// mobile
@media screen and (max-width: 768px){
	.sidebar {
        height: 100vh;
        left: 0;
        max-height: 100vh;
        position: fixed;
        right: 0;
        top: var(--offset);

		&.is-animating, &.is-expanded, &.is-expanded .sidebar-inner {
			-webkit-transform: translateX(0);
			transform: translateX(0);
			transition: transform .2s .1s linear;
		}
		&, & .sidebar-inner {
			-webkit-transform: translateX(-100%);
			transform: translateX(-100%);
			z-index: 60;
			transition: transform .2s .1s linear;
		}
		.backdrop {
			background: rgba(0,0,0,.3);
			border-radius: 0;
			bottom: 0;
			cursor: default;
			display: flex;
			left: 0;
			opacity: 0;
			position: fixed;
			right: 0;
			top: 0;
			width: 100%;
			will-change: opacity;
			z-index: 59;
			// transition: opacity .2s linear;
			transition: opacity .1s 0s linear;
		}
		&.is-expanded .backdrop {
			opacity: 1;
			transition: opacity .2s .2s linear;
		}
	}

}
</style>
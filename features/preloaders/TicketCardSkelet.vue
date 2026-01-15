<template>
    <div class="ticket__card skeleton">
        <div class="ticket__card-left">
            <div class="ticket__card-logo">
                <div class="skeleton__logo"></div>
                <div class="skeleton__text w-120"></div>
            </div>

            <div class="ticket__card-block">
                <!-- Left time -->
                <div class="ticket__card-time">
                    <div class="skeleton__text w-70"></div>
                    <div class="skeleton__text w-90"></div>
                </div>

                <!-- Path -->
                <!-- <div class="ticket__card-path">
                    <div class="ticket__card-path-top">
                        <div class="skeleton__icon"></div>
                        <div class="skeleton__text w-120"></div>
                        <div class="skeleton__icon"></div>
                    </div>
                    <div class="ticket__card-line line skeleton__line"></div>
                    <div class="ticket__card-path-bottom">
                        <div class="skeleton__text w-60"></div>
                        <div class="skeleton__text w-60"></div>
                    </div>
                </div> -->

                <!-- Right time -->
                <div class="ticket__card-time">
                    <div class="skeleton__text w-70"></div>
                    <div class="skeleton__text w-90"></div>
                </div>
            </div>
        </div>

        <!-- Right block -->
    </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
.ticket__card.skeleton {
    position: relative;
    overflow: hidden;
    background: #cbcbcc;
    border-radius: 10px;
    padding: 30px;
}

.skeleton__logo {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    background: #E5E7EB;
}

.skeleton__text {
    height: 16px;
    background: #E5E7EB;
    border-radius: 4px;
    margin: 6px 0;

    &.w-120 { width: 120px; }
    &.w-90  { width: 90px; }
    &.w-70  { width: 70px; }
    &.w-60  { width: 60px; }
}

.skeleton__icon {
    width: 24px;
    height: 24px;
    background: #E5E7EB;
    border-radius: 6px;
}

.skeleton__line {
    width: 100%;
    height: 2px;
    background: #E5E7EB;
    margin: 10px 0;
}

.skeleton__price {
    width: 120px;
    height: 28px;
    background: #E5E7EB;
    border-radius: 6px;
    margin-bottom: 15px;
}

.skeleton__button {
    width: 100px;
    height: 36px;
    background: #E5E7EB;
    border-radius: 8px;
}

.ticket__card.skeleton::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    animation: shimmer 1.4s infinite;
}

@keyframes shimmer {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}
</style>

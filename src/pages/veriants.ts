// src/variants.ts

export const fadeIn = (direction: 'up' | 'down' | 'left' | 'right', delay: number = 0) => {
    return {
        hidden: {
            y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
            x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
            opacity: 0,
        },
        show: {
            y: 0,
            x: 0,
            opacity: 1,
            transition: {
                type: 'tween',
                duration: 1.1,
                delay: delay,
                ease: [0.25, 0.75, 0.25, 0.75],
            }
        }
    }
}

/**
 * sandbox: https://codesandbox.io/s/smooth-scroll-vanila-js-i0usik
 */

export const scrollTo = (scrollTopNext: number) => {
    const $doc = document.documentElement;
    let scrollTopPrev: number = $doc.scrollTop;
    let scrollTopDiff: number = scrollTopNext - scrollTopPrev;
    let duration: number = Math.abs(scrollTopDiff) * 2;
    if (duration > 400) duration = 400;
    let timeEnd: number = performance.now() + duration;

    requestAnimationFrame(function ani(timeCurrent) {
        let timeDiff = timeEnd - timeCurrent;
        timeDiff = timeDiff > duration ? duration : timeDiff;
        let percent = 1 - timeDiff / duration;

        if (percent > 1) {
            $doc.scrollTop = scrollTopPrev + scrollTopDiff;
            return;
        }

        $doc.scrollTop = scrollTopPrev + scrollTopDiff * percent;
        return requestAnimationFrame(ani);
    });
};

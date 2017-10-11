export class ConstrainedDrag {

    private initial_x: number;
    private initial_y: number;
    private initial_top: number;
    private initial_left: number;
    private initial_transition: string;
    private min_top: number;
    private min_left: number;
    private dir: string;
    private target: HTMLElement;

    startDrag(dir: string, ev: MouseEvent): void {

        this.dir = dir;
        this.initial_x = ev.pageX || ev.clientX;
        this.initial_y = ev.pageY || ev.clientY;

        this.target = <HTMLElement>ev.target;
        this.initial_transition = this.target.style.transition;
        this.target.style.transition = 'none';
        this.initial_left = parseInt(this.target.style.left);
        this.initial_top = parseInt(this.target.style.top);

        const win_h = document.documentElement.clientHeight;
        const win_w = document.documentElement.clientWidth;

        this.min_left = win_w - this.target.clientWidth;
        this.min_top = win_h - this.target.clientHeight;

        document.body.onmousemove = this.moveDrag.bind(this);
        document.body.onmouseup = this.reset.bind(this);

    }

    moveDrag(e: MouseEvent): void {

        if (this.dir == 'ns') {

            const current_y = e.pageY || e.clientY;
            const diff = this.initial_y - current_y;

            let new_top = this.initial_top - diff;

            if (new_top > 0) {
                new_top = 0;
            } else if (new_top < this.min_top) {
                new_top = this. min_top;
            }

            this.target.style.top = new_top + "px";

        } else {
            const current_x = e.pageX || e.clientX;
            const diff = this.initial_x - current_x;

            let new_left = this.initial_left - diff;

            if (new_left > 0) {
                new_left = 0;
            } else if (new_left < this.min_left) {
                new_left = this. min_left;
            }

            this.target.style.left = new_left + "px";

        }
    }

    reset(): void {

        this.target.style.transition = this.initial_transition;
        document.body.onmousemove = document.body.onmouseup = null;

    }

}

import './xhrgen.js';
import config from './config.js';
import random from 'random';

import XMLHttpRequestGenerator from './xhrgen';

class Test {
    _9to1bool = () => random.float() < 0.9;

    constructor() {
        this.start();
    }

    longPause = () => {
        let i = 0;

        while (++i < 1e6);
    };

    shortPause = () => {
        let i = 0;

        while (++i < 1e7);
    };

    start() {
        const count = Math.ceil(Math.random() * config.requestCount);

        for (let i = 0; i < count; i++) {
            const taskType = random.boolean() ? 'long' : 'short';
            const async = !this._9to1bool();
            const method = this._9to1bool() ? 'POST' : 'GET';
            const url = 'start';

            const f = () =>
                XMLHttpRequestGenerator.create({
                    method,
                    url,
                    async,
                    taskType,
                });

            const needPause = random.boolean();
            const syncStart = this._9to1bool();

            if (syncStart) {
                f();
            } else {
                const syncStartPause = random.integer(1, 20);

                setTimeout(f, syncStartPause);
            }

            if (needPause) {
                const pause = random.boolean()
                    ? this.shortPause
                    : this.longPause;

                pause();
            }
        }
    }
}

export default Test;

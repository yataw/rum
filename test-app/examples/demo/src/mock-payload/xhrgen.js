import random from 'random';
import config from './config.js';

class XMLHttpRequestGenerator {
    events = [
        'onreadystatechange',
        'abort',
        'error',
        'load',
        'loadend',
        'loadstart',
        'progress',
        'timeout',
    ];
    _9to1bool = () => random.float() < 0.9;

    successBehaviorMap = {
        default: this._9to1bool,
        allSuccessed: () => true,
        allFailed: () => false,
    };
    successBehavior = this.successBehaviorMap[config.behaviour];

    constructor() {}

    shortTask = () => {
        let i = 0;

        while (++i < 1e6);
    };

    longTask = () => {
        let i = 0;

        while (++i < 1e7);
    };

    create({
        method = 'GET',
        url: url_ = '',
        async = true,
        taskType = 'short',
    } = {}) {
        const xhr = new XMLHttpRequest();
        const onloadType = random.boolean();
        const success = this.successBehavior();
        const task = taskType === 'short' ? this.shortTask : this.longTask;
        const url = new URL('http://localhost:9001/' + url_);
        const param = random.int(0, 9);

        url.searchParams.set('tasktype', taskType);
        url.searchParams.set('param', param);

        xhr.open(method, url.href, async);

        if (onloadType) {
            xhr.onload = task;
        } else {
            xhr.addEventListener('load', task);
            xhr.addEventListener('abort', task);
            xhr.addEventListener('timeout', task);

            if (!success) {
                const immediate = random.boolean();

                if (immediate) xhr.abort();
                else setTimeout(() => xhr.abort(), random.integer(1, 20));
            }
        }

        xhr.send();
        if (!async) task();
    }
}

export default new XMLHttpRequestGenerator();

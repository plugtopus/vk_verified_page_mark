function injectScript(file, node, id, check) {
    var th = document.getElementsByTagName(node)[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    if (id) {
        s.setAttribute('id', id);
        if (check) {
            if (document.querySelector("#" + id)) {
                return;
            }
        }
    }
    if (th) {
        th.appendChild(s);
    }
}

injectScript(chrome['extension'].getURL('core/script.js'), 'body');
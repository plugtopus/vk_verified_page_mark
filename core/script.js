(function() {

    function VkVerify() {
        this.checkVerify = false;
        this.isNew = true;
        this.trackPage();
    }

    VkVerify.prototype.trackPage = function() {
        if (this.trackTimer) {
            clearInterval(this.tackTimer);
        }
        var self = this;
        this.tackTimer = setInterval(function() {
            if (self.isUserPage()) {
                self.initButton();
            } else {
                self.hideButton();
            }
        }, 500);
    };


    VkVerify.prototype.isUserPage = function() {
        var uid = false;
        if (typeof window.vk != 'undefined') {
            if (typeof window.vk.id != 'undefined') {
                uid = window.vk.id;
            }
        }
        if (typeof window.cur != 'undefined') {
            if (typeof window.cur.module != 'undefined' && window.cur.module == 'profile') {
                if (typeof window.cur.postTo != 'undefined' && window.cur.postTo) {
                    this.uid = window.cur.postTo;
                    return uid == this.uid;
                }
                if (typeof window.cur.oid != 'undefined' && window.cur.oid) {
                    this.uid = window.cur.oid;
                    return uid == this.uid;
                }
            }
            return false;
        } else {
            return false;
        }
    };

    VkVerify.prototype.hideButton = function() {

    };


    VkVerify.prototype.initButton = function() {
        if (this.isUserPage()) {
            if (this.isNew) {
                var tag = '<a href="/verify" class="page_verified" onmouseover="pageVerifiedTip(this, {mid: ' + this.uid + '})"></a>';
                var x = document.querySelector('h2.page_name');
                var verify = document.querySelector('h2.page_name .page_verified');
                if (!verify) {
                    x.innerHTML += tag;
                }
            } else {
                var x = document.querySelector('#title');
                if (x) {
                    var verify = document.querySelector('#title .is-my-verify');
                    if (!verify) {
                        x.innerHTML += '<a href="/verify" class="page_verified is-my-verify" onmouseover="pageVerifiedTip(this, {mid: ' + this.uid + '})"></a>';
                    }
                }
            }
        }
        if (this.checkVerify) {
            clearInterval(this.checkVerify);
        }
        var self = this;
        this.checkVerify = setInterval(function() {
            self.initButton();
        }, 500);
    };

    var vkVerify = new VkVerify();
})();
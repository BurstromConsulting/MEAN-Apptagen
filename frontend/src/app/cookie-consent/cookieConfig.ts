export class CookieConfig {
    cookie: Cookie = new Cookie();
    theme: string = 'edgeless';
    type: string = 'opt-out';
}
export class Cookie {
        domain: string = "";
        expire: string = "";
        name: string = "";
        isConsented: boolean = false;
        path: string = 'path=/';
}
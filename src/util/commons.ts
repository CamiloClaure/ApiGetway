let _ = require('lodash');
function pickV2<T extends object, A>(source: T, c: new () => A): A {
    let reduced = createInstance(c);
    _.assign(reduced , _.pick(source, _.keys(reduced)));
    return reduced;
}

function createInstance<A>(c: new () => A): A {
    return new c();
}

export function cleanObject<Source extends object, Destination> (
    posts: Array<Source>, c: new () => Destination
): Array<Destination> {
    return posts.map((value) => {
        return pickV2<Source, Destination>(value, c)
    })
}
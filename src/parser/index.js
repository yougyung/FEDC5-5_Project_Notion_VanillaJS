import { parseTag } from "./Parser.js";

let bool = false;
const handleClick = () => console.log("hi");
const value = "myValue";

// class대신 className을 써야 함.. 키워드니까
const parsed = parseTag`
    <div>
        hello world
        <div 
            id=hello
            ${bool ? { hello: "world" } : null}
            className=test
        >
        </div>
        hello world
        <input 
            ref=input 
            onChange=${handleClick} 
            hello=world
            defaultValue=${value}
            a=b
            c=d
        />
        ${value}
    </div>
`;

console.log(JSON.stringify(parsed, null, 2));

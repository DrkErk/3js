// es6-string-html for glsl syntax
//
// (USES WEBGL 2 syntax)
// Const:  param is not writable
// In: its a copy of the actual variable and changing it wont affect the initial variable sent when calling the function
// Out: changing the value will change the variable sent when calling the function
import { Effect } from "postprocessing"

const fragmentShader = /* glsl */`
    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor)
    {
        outputColor = inputColor;
    }
`


export default class DrunkEffect extends Effect
{
    constructor(props)
    {
        super(
            'DrunkEffect',
            fragmentShader,
            {
                
            }
        )
    }
}


















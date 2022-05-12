// uniforms --- each thread receives the same data which it can read but cannot change.
//          --- can picture the uniforms like little bridges between the CPU and the GPU

// demo 1 --- 颜色随着时间改变（从开始运行算起
#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;

void main() {
	gl_FragColor = vec4(abs(sin(u_time)),0.0,0.0,1.0);
}
/* 
    The GPU has hardware accelerated angle, trigonometric and exponential functions. 
    Some of those functions are: 
        sin(), cos(), tan(), 
        asin(), acos(), atan(), 
        pow(), exp(), log(), 
        sqrt(), abs(), sign(), 
        floor(), ceil(), 
        fract(), mod(),
        min(), max() 
        clamp().
*/

// 可以使用各种数学上的函数来进行控制数字的动态生成，在每一个像素点动态返回一个颜色，即可展示动态颜色变化效果 --- 重点在数学方法。那些最终能够生成 -1 ~ 0 ~1 的函数

//TODO 我不知道如何 How to Slow down the frequency in Browser 


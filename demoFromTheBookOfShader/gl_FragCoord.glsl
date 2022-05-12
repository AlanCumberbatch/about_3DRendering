// gl_FragCoord --- the default output of GLSL : vec4 gl_FragColor
//              --- also the default input : vec4 gl_FragCoord
//              which holds the screen coordinates of the pixel or screen fragment that the active thread is working on// 存储的是当前正在执行函数的的像素位置//TODO 参照的是屏幕坐标系？？？

//demo
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;//??  哪里来的这个变量？？全局的吗？看着不像啊 --- u_resolution 是画布尺寸，即代表画布宽高
uniform vec2 u_mouse;
uniform float u_time;

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
	gl_FragColor = vec4(st.x,st.y,0.0,1.0);
}
/* 
    In the above code we normalize the coordinate of the fragment by dividing it by the total resolution of the billboard.
    By doing this the values will go between 0.0 and 1.0, 
    which makes it easy to map the X and Y values to the RED and GREEN channel.
 */

/* 
//TODO：
1. Can you figure out how to use u_mouse knowing that the values are in pixels and NOT normalized values? Can you use it to move colors around?
2. Can you imagine an interesting way of changing this color pattern using u_time and u_mouse coordinates?
 */ 
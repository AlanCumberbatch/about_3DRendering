```
  // code in "Rendering our First Spheres"
  O = (0, 0, 0) //❶Place the camera and the viewport as desired
  for x = -Cw/2 to Cw/2 {
    for y = -Ch / 2 to Ch / 2{ // For each pixel on the canvas
      D = CanvasTpViewport(x, y) // ❷Determine which square on the viewport corresponds to this pixel
      color = TraceRay(O, D, 1, inf) // ❸Determine the color seen through that square
      canvas.PutPixel(x, y, color) // ❹Paint the pixel with that color
    }
  }

  CanvasToViewport(x, y) {
    return (x*Vw/Cw, y*Vh/Ch, d)
  }

  TraceRay(O, D, t_min, t_max) {
    // args:
    // O represents the origin of the ray; although we’re tracing rays from the camera, which is placed at the 
    // The same applies to t_min and t_max.
    closest_t = inf
    closest_sphere = NULL
    for sphere in scene.spheres {
        t1, t2 = IntersectRaySphere(O, D, sphere)   //  "IntersectRaySphere"  just solves the quadratic 
        if t1 in [t_min, t_max] and t1 < closest_t {
            closest_t = t1
            closest_sphere = sphere
        }
        if t2 in [t_min, t_max] and t2 < closest_t {
            closest_t = t2
            closest_sphere = sphere
        }
    }
    if closest_sphere == NULL {
       ❶return BACKGROUND_COLOR
    }
    return closest_sphere.color
}

  IntersectRaySphere(O, D, sphere) {
    r = sphere.radius
    CO = O - sphere.center

    a = dot(D, D)
    b = 2*dot(CO, D)
    c = dot(CO, CO) - r*r

    discriminant = b*b - 4*a*c
    if discriminant < 0 {
        return inf, inf
    }

    t1 = (-b + sqrt(discriminant)) / (2*a)
    t2 = (-b - sqrt(discriminant)) / (2*a)
    return t1, t2
  }


  // ---  To put all of this into practice
  viewport_size = 1 x 1
  projection_plane_d = 1
  sphere {
      center = (0, -1, 3)
      radius = 1
      color = (255, 0, 0)  # Red
  }
  sphere {
      center = (2, 0, 4)
      radius = 1
      color = (0, 0, 255)  # Blue
  }
  sphere {
      center = (-2, 0, 4)
      radius = 1
      color = (0, 255, 0)  # Green
  }
```




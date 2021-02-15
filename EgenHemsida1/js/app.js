/*
Idéer:
 *Åtkomst till navbar oberoende på vart man är på sidan, slider eller något?
 *"Intro" / "Loadingscreen"

*/
const t1 = gsap.timeline({defaults: {ease: "power1.out"}});

t1.to("#s1", {x: "100%", duration: "0.6", delay: "1.5"});
t1.to("#s2 span", {y: "0", duration: "1", stagger: "0.25"});
t1.to("#s2 span", {color: "white", duration: "1", stagger: "0.25"}, "-=1");
t1.to("#s2", {y: "-100%", duration: "0.6", delay: "0.5"});

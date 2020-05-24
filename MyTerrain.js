class MyTerrain extends CGFobject {
    constructor(scene) {
        super(scene);
        this.plane=new MyPlane(scene,20, false);

        this.shaders(scene);
    }
    shaders(scene){
        this.textureTerrainMap = new CGFtexture(this.scene, "images/terrainmap.jpg");
		this.textureTerrainTex = new CGFtexture(this.scene, "images/terrain.jpg");

        this.shaderTerrain= new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        this.shaderTerrain.setUniformsValues({uSampler0: 0});
		this.shaderTerrain.setUniformsValues({uSampler1: 1});
    }
    display(){
        this.scene.setActiveShader(this.shaderTerrain);
        this.textureTerrainTex.bind(0);
        this.textureTerrainMap.bind(1);
        this.scene.pushMatrix();
        this.scene.scale(50,8, 50);
        this.scene.rotate(-Math.PI/2, 1,0,0);
        this.plane.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
    }
}
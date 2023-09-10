 
        <Environment 
        //background
        // preset="sunset" // gets prebuilt envMaps
        // ground={{
        //     height: envMapHeight,
        //     radius: envMapRadius,
        //     scale: envMapScale
        // }}
        //resolution={32}

        /* hdr/hdri
        files="./environmentMaps/the_sky_is_on_fire_2k.hdr"
        */

        /* for non-HDR/HDRI envmaps
        files={ [
                './environmentMaps/2/px.jpg',
                './environmentMaps/2/nx.jpg', 
                './environmentMaps/2/py.jpg', 
                './environmentMaps/2/ny.jpg', 
                './environmentMaps/2/pz.jpg', 
                './environmentMaps/2/nz.jpg'
                ]}
        */
        >

            
        {/* <color args={['black']} attach='background'/> */}
        
        {/* <Lightformer 
        position-z={-5} 
        scale={10} 
        color='red'
        intensity={10}
        form="ring"
        /> */}


        {/*
        one way to add to envmap without doing something crazy

        <mesh position-z={-5} scale={10}>
            <planeGeometry />
            <meshBasicMaterial color={[10,0,0]} />
        </mesh>
            */}

        </Environment>
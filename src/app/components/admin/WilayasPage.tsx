'use client'
import { useRouter } from "next/navigation"
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { updateWilaya } from "@/app/(admin)/admin/wilayas/action";


interface Wilaya {
    id: string;
    name: string;
    price: number;
    hide: boolean;
}

interface Props {
    wilayas: Wilaya[]
}


export default function WilayasPage({ wilayas }: Props){

    const router = useRouter();

    const columns = [
        {
          field: 'name',
          headerName: 'Wilaya',
          width: 150,
        },
         {
            field: 'price',
            headerName: 'Price',
            width: 150,
          },

          {
            field: 'hide',
            headerName: 'Hide',
            width: 150,
          },

    ]

    const [modalShow,setModalShow] = useState(false);

    const [selected,setSelected] = useState<Wilaya | null>(null);

    const handleUpdate = async () => {
     if(selected){
      await updateWilaya(selected?.id, selected?.price, selected?.hide)
     }

     setModalShow(false);
     setSelected(null);
     router.refresh();

    }

    return(
        <div style={{width:"100%"}}>
          <div style={{width:"100%",display:"flex",justifyContent:"center"}}>
          <Box sx={{ height: "80vh", width: '100%' , marginTop:"50px" }}>
      <DataGrid
        rows={wilayas}
        getRowId={(row)=>row.id}
        columns={columns}
        onRowClick={(row)=>{setModalShow(true);setSelected(row.row)}}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
      />
    </Box>
    </div>


    <Modal
      show={modalShow}
      onHide={() => setModalShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Wilaya
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {selected != null && 
        <div>

        <div className="d-flex gap-4 mb-4">
         <h4>Wilaya : {selected.name}</h4>
         
        </div>

        <div className="d-flex gap-4 mb-4">
         <h4> Price : </h4>
         <input value={selected.price}
         onChange={(e) => setSelected({ name: selected.name, id: selected.id , price: Number(e.target.value) , hide: selected.hide })}
          
          type="number"></input>
        </div>

        <div className="d-flex gap-4">
         <h4> Hide :</h4>
         <input checked={selected.hide} 
         onChange={(e) => setSelected({name: selected.name, id: selected.id , price: selected.price , hide: e.target.checked })}
          type="checkbox"
          >
        </input>
        </div>

        </div>
      }

      </Modal.Body>
      <Modal.Footer>
         <Button onClick={()=>handleUpdate()}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
        </div>
    )
}
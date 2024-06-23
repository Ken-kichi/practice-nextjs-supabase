'use client'
import { ChangeEvent, useState } from "react"
import { updateWatch } from "../server-actions/updateWatch"

type EditWatchProps = {watch:{id:string,reference_number:string,brand:string,model:string}}

const EditWatch = ({watch}:EditWatchProps) => {

  const [showModal,setShowModal] = useState(false)
  const [formData,setFormData] = useState({
    brand:watch.brand,
    model:watch.model,
    referenceNumber:watch.reference_number
  })

  const onChange = (e:ChangeEvent<HTMLInputElement>)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  return (
    <div>
      <button onClick={()=>setShowModal(true)}>
        Edit
        </button>
        {
          showModal && (
            <div>
              <div>
                <span onClick={()=>setShowModal(false)}>&times;</span>
                <form action={updateWatch} onSubmit={()=>setShowModal(false)}>
                  <input type="hidden" name="id" value={watch.id}/>
                  <div>
                    <label htmlFor="brand">Brand</label>
                    <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    onChange={onChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="model">Model</label>
                    <input type="text"
                    id="model"
                    name="model"
                    value={formData.model}
                    onChange={onChange}
                    />
                     </div>
                  <div>
                    <label htmlFor="referenceNumber">referenceNumber</label>
                    <input
                    type="text"
                    id="referenceNumber"
                    name="referenceNumber"
                    value={formData.referenceNumber}
                    onChange={onChange}
                    />
                     </div>
                     <button type="submit" >Update</button>
                  </form>
                </div>
            </div>
          )
        }
    </div>
  )
}

export default EditWatch

const Doctor = require("../models/Doctor");

const createDoctor = async (req, res) => {
    const { name, crm, specialty, clinic, phone, favorite } = req.body;

    try {
        const doctor = await Doctor.create({ name, crm, specialty, clinic, phone, favorite });
        console.log(`Médico ${doctor.name} criado`);
        res.status(201).send(doctor);

    } catch (error) {
        res.status(500).send({message: error.message});
    }
};

const getAllDoctors = async (req, res) => {
    //traz todos os médicos, mas tbm pode ser usado para trazer só os favoritos
    const favorite = req.query.favorite; // Nesse caso não é desestruturado pois é uma variável que pode ou não existir, na desestruturação passaria a ser obrigatorio (viria como undefined)
    //const { favorite = false } = req.body -  Em caso de não existir ele retorna false ao invés de undefined
    try {
        const where = favorite ? { where: { favorite } }: {} 
        const doctors = await Doctor.findAll(where);

        if (doctors && doctors.length > 0){
            res.status(200).send(doctors)
        } else {
            res.status(204).send()
        }

    } catch (error) {
        sendErrorMessage(error)
    }
}

const getDoctor = async (req, res) => {
    const doctorId = req.params.id;

    try {

        const doctor = await Doctor.findOne({
            where: { id: doctorId }
        });
    
        if (doctor) {
            res.status(200).send(doctor)
        } else {
            res.status(404).send({ message: `Médico de id ${doctorId} não foi encontrado na base.`})
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
};

const updateDoctorInDB = async ({ name, specialty, phone, crm, favorite, doctorId, clinic }) => {
    const rowsUpdated = await Doctor.update({ name, crm, specialty, clinic, phone, favorite }, {
        where: { id: doctorId }
    })
        return (rowsUpdated && rowsUpdated[0] > 0) ? true : false
}

const updateDoctor = async (req, res) => {
    const doctorId = req.params.id;
    const { name, crm, specialty, clinic, phone, favorite } = req.body;

    try {
        const doctorUpdated = await updateDoctorInDB({ name, specialty, phone, crm, favorite, doctorId, clinic })

        doctorUpdated
        ? res.status(200).send({ message: "Medico alterado com sucesso" })
        : res.status(404).send({ message: "Medico nao encontrado para alterar" })

    } catch (error) {
        sendErrorMessage(error)
    }
} 

const sendErrorMessage = error => {
    res.status(500).send({ message: error.message })
}

/* const updateDoctor = async (req, res) => {
    const doctorId = req.params.id;
    const { name, crm, specialty, clinic, phone, favorite } = req.body;

    try {
        const rowsUpdated = await Doctor.update({name, crm, specialty, clinic, phone, favorite}, {
            where: { id: doctorId }
        });

        if (rowsUpdated && rowsUpdated[0] > 0 ) {
            res.status(200).send({ message: `Médico alterado com sucesso!`});
        } else {
            res.status(404).send({ message: `Médico não encontrado para alterar`});
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }

} */

module.exports = {
    createDoctor,
    getAllDoctors,
    getDoctor,
    updateDoctor
}
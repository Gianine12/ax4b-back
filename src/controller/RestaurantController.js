const { where } = require('sequelize');
const sequelize = require('sequelize');
const { Sequelize } = require('../database/index');

const db = require('../database/index');

const Restaurant = db.restaurant
const Votacao = db.votacao;
const User = db.user;

module.exports = {
  async creatRestaurant(req, res){
    try{
      const data = req.body;
      
      const [newRestaurant, created] = await Restaurant.findCreateFind({
        where: { ...data }
      });
      
      if(!created){
        return res.json({
          icon: "info",
          title: "Atenção",
          msg: "Restaurante já cadastrado."
        },200)
      };

      return res.json({ 
        icon: "success",
        title: "Sucesso",
        msg : "Restaurante cadastrado com sucesso.",
        restaurante: newRestaurant
      }, 201);

    }catch(e){
      return res.json({
        icon: "error",
        title: "Atenção",
        msg: "Não foi possivel cadastrar o restaurante."
      })
    }
  },

  async getAllRestaurant(req, res){
    try{
      const restaurant = await Restaurant.findAll();

      return res.json(restaurant);
    }catch(e){
      return res.json({
        error: e.message,
        msg: "Não foi possivel retornar todos os restaurantes"
      },400)
    }
  },

  async getSpecificRestaurant(req, res){
    try{
      const { id } = req.params;

      const restaurant = await Restaurant.findByPk(id);

      if(!restaurant){
        return res.json({
          msg: "Restaurante não encontrado."
        },404)
      };

      return res.json({resturante: restaurant})

    }catch(e){
      return res.json({
        error: e.message,
        msg: "Não foi possivel encontrar Restaurante"
      },400)
    }
  },

  async updateRestaurant(req, res){
    try{
      const { id } = req.params;
      const data = req.body;

      const restaurant = await Restaurant.findByPk(id);

      if(!restaurant){
        return res.json({
          msg: "Restaurante não encontrado."
        },404)
      };

      const attRestaurant = await Restaurant.update({
        ...data
      }, { 
        where: {
          id: id
        }
      });

      return res.json({
        msg: "Restaurante atualizado com sucesso."
      },201);

    }catch(e){
      return res.json({
        error: e.message,
        msg: ""
      })
    }
  },

  async deleteRestaurant(req, res){
    try{
      const { id } = req.params;

      const restaurant = await Restaurant.findByPk(id);

      if(!restaurant){
        return res.json({
          msg: "Restaurante não encontrada"
        });
      }

      const delRestaurant = await Restaurant.destroy({
        where: {
          id: id
        }
      });

      return res.json({
        msg: "Restaurante deletado com sucesso"
      });
    }catch(e){
      return res.json({
        error: e.message,
        msg: "Não foi possivel deletar restaurante"
      })
    }
  },

  async restauranteVotado(req, res){
    try{
      const data = req.body;
      let user;
      let pesq;

      if(data.id !== undefined){
        pesq = {id: parseInt(data.id)}
      }else{
        pesq = { name: data.nome}
      }

      user = await User.findOne({
        where: {
          ...pesq
        }
      })

      if(!user){
        return res.json({
          icon: "warning",
          title: "Erro",
          msg: "Usuário não encontrado."
        })
      }

      const date = new Date().toLocaleString('en-GB', {
        hour12: false,
      }).split(',');
      
      let parts_of_date = date[0].split("/");
      
      let output = new Date(+parts_of_date[2], parts_of_date[1] - 1, +parts_of_date[0]);
      data.hora_votacao = date[1].trim();
      
      const votacao = await Votacao.findOne({
        where: {
          usuario_id: user.id
        }
      })

      if(votacao){
        return res.json({
          icon: "info",
          title: "Atenção",
          msg: "Usuário ja realizou uma votação."
        })
      }

      const newVotacao = await Votacao.create({
        data_votacao: output,
        hora_votacao: data.hora_votacao,
        usuario_id: user.id,
        restaurante_id: data.restaurante_id
      });

      return res.json({
        icon: "success",
        title: "Sucesso",
        msg: "Obrigado por fazer parte da votação."
      })
    }catch(e){
      return res.json({
        icon: "error",
        title: "Atenção",
        msg: "Não foi possivel realizar votação."
      })
    }
  },

  async getVotacaoDia(req,res){
    const date = new Date().toLocaleString('en-GB', {
      hour12: true,
    }).split(',');

    let dia = date[0].split("/")[0];
    let ano = new Date().getFullYear();
    let mes = new Date().getMonth()+1;

    if(dia <= 9){
      dia = `0${dia}`
    }

    if(mes <= 9){
      mes = `0${mes}`
    }

    let novaData = `${ano}-${mes}-${dia}T03:00:00.000Z`

    const votacao = await Votacao.findAll({
      where: {
        hora_votacao: {
          [sequelize.Op.between]: ['09:00','11:50']
        },
        data_votacao: {
          [sequelize.Op.eq]: novaData
        }
      }
    });

    const restaurant = await Restaurant.findAll();

    let countRestaurante = []

    restaurant.map((ret) => {
      let count = 0;

      votacao.map((vot) => {
        if(vot.restaurante_id == ret.id){
          count += 1;
        }
      })
      countRestaurante.push({
        restaurant_id: ret.id,
        name: ret.name,
        stars: ret.stars,
        count: count
      })
    });

    return res.json(countRestaurante)
  }

}
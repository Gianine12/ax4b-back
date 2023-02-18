const db = require('../database/index');

const User = db.user;

module.exports = {
  async createUser(req, res){
    try{
      const data = req.body;
      
      const [newUser, created] = await User.findOrCreate({
        where: { ...data},
      });

      if(!created){
        return res.json({ 
          icon: "info",
          title: "Atenção",
          msg : "Usuario já cadastrado.",
        },200)
      }

      return res.json({
        icon: "success",
        title: "Sucesso", 
        msg : "Usuário cadastrado com sucesso.",
      }, 201);

      
    }catch(e){
      return res.json({
        icon: "error",
        title: "Atenção",
        msg: "Não foi possivel cadastrar um usuário."
      })
    }
  },

  async getAllUser(req, res){
    try{
      const users = await User.findAll();

      return res.json(users);

    }catch(erro){
      return res.json({
        msg: "Não foi possivel retorna todos os usarios",
        error: erro.message
      });
    }
  },

  async getSpecificUser(req, res){
    try{
      const { id } = req.params;

      const user = await User.findByPk(id);
      if(!user){
        return res.json({
          msg: "Usuário não encontrado."
        })
      };

      return res.json({usuario: user})
    }catch(erro){
      return res.json({
        msg: "Não foi possivel retorna o usario",
        error: erro.message
      });
    }
  },

  async updateUser(req, res){
    try{
      const { id } = req.params;
      const data = req.body;

      const user = await User.findByPk(id);

      if(!user){
        return res.json({
          msg: "Usuário não encontrado."
        });
      }
      
      const attUser = await User.update({
        ...data
      },{ 
        where: 
        {id: id}
      })
      console.log(attUser)
      return res.json({
        msg: "Usuário encontrado com sucesso."
      }, 200)
      
    }catch(erro){
      return res.json({
        msg: "Não foi possivel atualizar usarios",
        error: erro.message
      });
    }
  },

  async deleteUser(req, res){
    try{
      const { id } = req.params;

      const user = await User.findByPk(id);

      if(!user){
        return res.json({
          msg: "Usuário não encontrada"
        });
      }

      const delUser = await User.destroy({
        where: {
          id: id
        }
      });

      return res.json({
        msg: "Usuário deletado com sucesso"
      });

    }catch(erro){
      return res.json({
        msg: "Não foi possivel deletar o usarios",
        error: erro.message
      });
    }
  },
}
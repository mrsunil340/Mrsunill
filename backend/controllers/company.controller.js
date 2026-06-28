import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";


export const registerCompany = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }

    let company = await Company.findOne({ name: name.trim() });

    if (company) {
      return res.status(400).json({
        message: "You can't register same company",
        success: false,
      });
    }

    company = await Company.create({
      name: name.trim(),
    });

    return res.status(201).json({
      message: "Company registered successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log("REGISTER COMPANY ERROR:", error);
    return res.status(500).json({
      message: "Server error while registering company",
      success: false,
    });
  }
};

export const getCompany = async (req, res) => {
  try {
    const companies = await Company.find();

    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log("GET COMPANY ERROR:", error);
    return res.status(500).json({
      message: "Server error while fetching companies",
      success: false,
    });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log("GET COMPANY BY ID ERROR:", error);
    return res.status(500).json({
      message: "Server error while fetching company",
      success: false,
    });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    let logo;
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      logo = cloudResponse.secure_url;
    }

    const updateData = {
      name,
      description,
      website,
      location,
    };

    if (logo) {
      updateData.logo = logo;
    }

    const company = await Company.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company information updated successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log("UPDATE COMPANY ERROR:", error);
    return res.status(500).json({
      message: "Server error while updating company",
      success: false,
    });
  }
};
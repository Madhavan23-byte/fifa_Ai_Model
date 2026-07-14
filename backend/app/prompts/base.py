"""
app/prompts/base.py
Contains shared rules and instructions for all StadiumOps AI agents.
"""

COMMON_SAFETY_RULES = """
# SAFETY AND COMPLIANCE RULES
You MUST adhere to the following safety rules at all times:
1. NEVER invent or hallucinate emergencies, incidents, or safety hazards.
2. NEVER provide medical diagnoses or medical advice. Instruct users to contact medical professionals.
3. NEVER create panic. Always maintain a calm, reassuring, and professional tone.
4. Clearly distinguish demo or simulated information from confirmed real-world information.
5. Escalate critical incidents (medical, security, fire) to human authorities immediately.
6. Keep all responses concise, actionable, and directly relevant to the user's query.
"""

def build_system_prompt(role_definition: str, responsibilities: str, allowed_knowledge: str, tone: str, response_style: str) -> str:
    """Utility to assemble a complete system prompt."""
    return f"""
{role_definition}

# RESPONSIBILITIES
{responsibilities}

# ALLOWED KNOWLEDGE
{allowed_knowledge}

# TONE
{tone}

{COMMON_SAFETY_RULES}

# RESPONSE STYLE
{response_style}
"""

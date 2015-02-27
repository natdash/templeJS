/* templeJS v0.1 - Straight forward HTML5 template engine using jQuery */

// template framework (used to extend jQuery)
temple =
{
	// builds an instance of the template for the current value
	build: function(template, index, value)
	{
		// setup instance
		var instance = document.createElement('div');
		instance.setAttribute('data-temple', '');
		if (template.dataset.class)
			instance.className = template.dataset.class;
		instance.id = (template.id || 'value') + index;

		// clone template
		instance.appendChild(document.importNode(template.content, true));

		// evaluate data values
		var children = instance.querySelectorAll('[data-text],[data-html]');
		for(var j = 0; j < children.length; j++)
		{
			var child = children[j];

			// evaluate text value
			if (child.dataset.text)
			{
				child.textContent = eval(child.dataset.text);
				child.removeAttribute('data-value');
			}

			// evaluate HTML value
			else if (child.dataset.html)
			{
				child.innerHTML = eval(child.dataset.html);
				child.removeAttribute('data-text');
			}
		}

		$.parentsOnly('[data-source]', instance).temple(undefined, value);
		this.appendChild(instance);
	},

	// applies a template
	apply: function(data, value)
	{
		if (!this.dataset.source)
			return;

		// object array to iterate (convert if not array)
		if (!data)
			data = eval(this.dataset.source);
		if (!Array.prototype.isPrototypeOf(data))
			data = [ data ];

		// template to use
		var template =
			    this.dataset.template ?
				    document.getElementById(this.dataset.template) :
				    this.querySelector('template');

		// build all elements in the dataset
		if (template)
		{
			for(var i = 0; i < data.length; i++)
				temple.build.call(this, template, i, data[i]);

			// apply or remove "empty" class if applicable
			if (this.dataset.emptyclass)
			{
				if (data.length == 0)
					$(this).addClass(this.dataset.emptyclass);
				else
					$(this).removeClass(this.dataset.emptyclass);
			}
		}

		return $(this);
	},

	// applies all onload data sources
	onload: function()
	{
		$.parentsOnly('[data-apply="onload"]', document).temple();
	},

	// extensions to jQuery prototype
	extensions:
	{
		templeAll: function()
		{
			$.parentsOnly('[data-source]', this).temple();
		},

		retempleAll: function()
		{
			$.parentsOnly('[data-source]', this).retemple();
		},

		temple: function(data, value)
		{
			return $(this).each(function() { temple.apply.call(this, data, value); });
		},

		untemple: function()
		{
			$('[data-temple]', this).remove();
			return $(this);
		},

		retemple: function(data)
		{
			return $(this).untemple().temple(data);
		}
	}
};

// selects only the top level nodes, excluding any nested nodes of the same selector)
$.parentsOnly = function(selector, scope)
{
	return  $(selector, scope).filter(function() { return $(this).parent().closest(selector, scope).length == 0; });
};

// applies all template data sources
$.templeAll = function()
{
	$(document).templeAll();
};

$.fn.extend(temple.extensions);
$(document).ready(temple.onload);
